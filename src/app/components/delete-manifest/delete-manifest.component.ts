// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, LoadingController, Platform, AlertController } from '@ionic/angular';

// Other libraries
import { Subscription } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IManifest } from '../../models/interfaces/manifest.interface';
import { ManifestFactory } from '../../models/factories/manifest.factory';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { ManifestActionFactory } from '../../store/factories/manifest-action.factory';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';
import { ErrorType } from '../../shared/enumerations/enumerations';
import { BaseComponent } from '../../shared/base.component';
import { LoadingConstants } from '../../shared/constants/loading.constants';
import { FunctionConstants } from '../../shared/constants/function.constants';

@Component({
    selector: 'app-delete-manifest',
    templateUrl: './delete-manifest.component.html',
    styleUrls: ['./delete-manifest.component.scss'],
})
export class DeleteManifestComponent extends BaseComponent implements OnInit, OnDestroy {

    private _manifestSubscription: Subscription;
    private _deleteSubscription: Subscription;
    manifestToDelete: IManifest;

    constructor(
        private _modalController: ModalController,
        private _loadingController: LoadingController,
        private _store: Store<IAppState>,
        screenPlatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenPlatformService, screenOrientationService,
            alertController, store);
        this.manifestToDelete = ManifestFactory.CreateGenericManifest();
        this._manifestSubscription = new Subscription();
        this._deleteSubscription = new Subscription();
    }

    ngOnInit() {
        this._manifestSubscription = this._store.select('manifestState').subscribe(manifestState => {
            this.error = manifestState.manifestError;
            this.isLoading = manifestState.loadingManifestList;
            this.manifestToDelete = manifestState.editedManifest;
        });
    }

    onDelete() {
        this._loadingController.create({
            spinner: 'crescent',
            message: LoadingConstants.DELETING_MANIFEST
        })
            .then(loadingElement => {
                this._store.dispatch(ManifestActionFactory.CreateDeleteManifestStart(this.manifestToDelete));
                loadingElement.present()
                    .then(() => {
                        const pause: number = 1;
                        while (pause === 1) {
                            if (!this.isLoading) {
                                break;
                            }
                        }
                        loadingElement.dismiss()
                            .then(() => {
                                if (this.error.ErrorType !== ErrorType.NoError) {
                                    throw (this.error);
                                } else {
                                    this._modalController.dismiss({
                                        'deleted': true
                                    });
                                }
                            })
                            .catch((error: IManifestManagerError) => {
                                this.displayError(error);
                            });
                    });
            });
    }

    onCancel() {
        this._modalController.dismiss(null, 'cancel');
    }

    DisplayManifestType() {
        if (this.manifestToDelete.ManifestTypeCode === FunctionConstants.MANIFEST_CODE) {
            return FunctionConstants.MANIFEST_NAME;
        } else {
            return FunctionConstants.JUMP_MANIFEST_NAME;
        }
    }

    ngOnDestroy() {
        if (this._manifestSubscription) {
            this._manifestSubscription.unsubscribe();
        }

        if (this._deleteSubscription) {
            this._deleteSubscription.unsubscribe();
        }

        this._store.dispatch(ManifestActionFactory.CreateStopEdit());
    }
}
