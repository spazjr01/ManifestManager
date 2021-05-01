// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, LoadingController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subscription } from 'rxjs';

// Manifest Manager classes and components
import { IManifest } from '../../../models/interfaces/manifest.interface';
import { ManifestFactory } from '../../../models/factories/manifest.factory';
import { BaseComponent } from '../../../shared/base.component';
import { IAppState } from '../../../store/interfaces/app-state.interface';
import { ManifestActionFactory } from '../../../store/factories/manifest-action.factory';
import { IManifestManagerError } from '../../../models/interfaces/manifest-manager-error.interface';
import { ErrorType } from '../../../shared/enumerations/enumerations';
import { LoadingConstants } from '../../../shared/constants/loading.constants';

@Component({
    selector: 'app-add-manifest',
    templateUrl: './add-manifest.page.html',
    styleUrls: ['./add-manifest.page.scss'],
})
export class AddManifestPage extends BaseComponent implements OnInit, OnDestroy {

    inputFieldHasFocus: boolean;
    manifest: IManifest;
    private _addManifestSubscription: Subscription;
    private _authStateSubscription: Subscription;

    constructor(
        private _loadingController: LoadingController,
        screenPlatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenPlatformService, screenOrientationService,
            alertController, store);
        this.inputFieldHasFocus = false;
        this._addManifestSubscription = new Subscription();
        this._authStateSubscription = new Subscription();
    }

    ngOnInit(): void {
        this.manifest = ManifestFactory.CreateManifest(
            '',
            'M',
            'AddManifestPlaceholderUserId'

        )
        this._authStateSubscription = this.store.select('authState').subscribe(authState => {
            this.manifest.UserId = authState.user.UserId;
        });
        this._addManifestSubscription = this.store.select('manifestState').subscribe(manifestState => {
            this.error = manifestState.manifestError;
            this.isLoading = false;//manifestState.loadingManifest;
            this.manifest.ManifestUic = manifestState.uic;
        });
    }

    onSubmit(form: NgForm) {
        this.inputFieldHasFocus = false;

        if (!form.valid) { return; }

        let newManifest = { ...this.manifest };
        newManifest.ManifestName = this.manifest.ManifestName.toUpperCase();
        
        this._loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: LoadingConstants.ADDING_MANIFEST
        })
            .then(loadingElement => {
                this.store.dispatch(ManifestActionFactory.CreateAddManifestStart(newManifest));
                loadingElement.present()
                    .then(() => {
                        //const pause: number = 1;
                        while (this.isLoading) {
                            //if (!this.isLoading) {
                            //    break;
                                
                            //}
                        }

                        loadingElement.dismiss()
                            .then(() => {
                                if (this.error.ErrorType !== ErrorType.NoError) {
                                    throw (this.error);
                                }
                            })
                            .catch((error: IManifestManagerError) => {
                                this.displayError(error);
                            });
                        
                    });
            });
    }

    ionViewWillEnter() {
        this.deviceHeight = this.platformService.height();
    }

    ngOnDestroy(): void {
        if (this._authStateSubscription) {
            this._authStateSubscription.unsubscribe();
        }
        if (this._addManifestSubscription) {
            this._addManifestSubscription.unsubscribe();
        }

        this.store.dispatch(ManifestActionFactory.CreateStopEdit());
    }
}
