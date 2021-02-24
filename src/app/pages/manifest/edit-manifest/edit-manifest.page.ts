// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

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
import { MessageConstants } from '../../../shared/constants/message.constants';

@Component({
    selector: 'app-edit-manifest',
    templateUrl: './edit-manifest.page.html',
    styleUrls: ['./edit-manifest.page.scss'],
})
export class EditManifestPage extends BaseComponent implements OnInit, OnDestroy {

    inputFieldHasFocus: boolean;
    manifest: IManifest;
    private _changeSubmitted: boolean;
    private _manifestStateSubscription: Subscription;
    private _authStateSubscription: Subscription;

    constructor(
        private _loadingController: LoadingController,
        private _navController: NavController,
        private _toastController: ToastController,
        screenPlatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenPlatformService, screenOrientationService,
            alertController, store);
        this.inputFieldHasFocus = false;
        this._changeSubmitted = false;
        this._manifestStateSubscription = new Subscription();
        this._authStateSubscription = new Subscription();
        this.manifest = ManifestFactory.CreateGenericManifest();
    }

    ngOnInit() {
        this._authStateSubscription = this.store.select('authState').subscribe(authState => {
            this.manifest.UserId = authState.user.UserId;
        });

        this._manifestStateSubscription = this.store.select('manifestState').subscribe(manifestState => {
            this.error = manifestState.manifestError;
            this.isLoading = manifestState.loadingManifest;
            if (!this._changeSubmitted && manifestState.editedManifest.ManifestId < 0) {
                this._navController.navigateBack('/manifest');
            } 
            if (!this._changeSubmitted) {
                this.manifest = { ...manifestState.editedManifest };
            }
        });
    }

    onSubmit(form: NgForm) {
        this.inputFieldHasFocus = false;

        if (!form.valid) { return; }

        let editedManifest = { ...this.manifest };
        editedManifest.ManifestName = this.manifest.ManifestName.toUpperCase();
        
        this._loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: LoadingConstants.EDITING_MANIFEST
        })
            .then(loadingElement => {
                this._changeSubmitted = true;
                this.store.dispatch(ManifestActionFactory.CreateEditManifestStart(editedManifest));
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

    async displaySuccess(toastMessage: string) {
        const toast = await this._toastController.create({
            message: toastMessage,
            position: 'middle',
            buttons: [
                {
                    text: MessageConstants.OK,
                    role: 'cancel',
                    handler: () => {
                        this._navController.navigateBack('/manifest');
                    }
                }
            ]
        });
        toast.present();
    }

    ngOnDestroy(): void {
        if (this._authStateSubscription) {
            this._authStateSubscription.unsubscribe();
        }
        if (this._manifestStateSubscription) {
            this._manifestStateSubscription.unsubscribe();
        }

        this.store.dispatch(ManifestActionFactory.CreateStopEdit());
    }
}
