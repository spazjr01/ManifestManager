// Angular libraries
import {
    Component,
    ElementRef,
    ViewChild,
    OnDestroy,
    OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, ToastController, LoadingController, AlertController, NavController, MenuController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subscription } from 'rxjs';

// Manifest Manager classes and components
import { ScannerService } from '../../../services/scanner.service';
import { ScannerTipService } from '../../../services/scanner-tip.service';
import { PersonFactory } from '../../../models/factories/person.factory';
import { IAppState } from '../../../store/interfaces/app-state.interface';
import { IManifestManagerError } from '../../../models/interfaces/manifest-manager-error.interface';
import { PersonActionFactory } from '../../../store/factories/person-action.factory';
import { ScannerConstants } from '../../../shared/constants/scanner.constants';
import { LoadingConstants } from '../../../shared/constants/loading.constants';
import { MessageConstants } from '../../../shared/constants/message.constants';
import { AddPersonSharedComponent } from '../../../pages/add/add-person-shared.component';
import { FunctionType, ErrorType } from '../../../shared/enumerations/enumerations';
import { ManifestManagerErrorFactory } from '../../../models/factories/manifest-manager-error.factory';
import { ErrorConstants } from '../../../shared/constants/error.constants';
import { IScanner } from '../../../models/interfaces/scanner.interface'
import { ScannerFactory } from 'src/app/models/factories/scanner.factory';

@Component({
    selector: 'app-camera-scan',
    templateUrl: './camera-scan.page.html',
    styleUrls: ['./camera-scan.page.scss']
})

export class CameraScanPage extends AddPersonSharedComponent implements OnInit, OnDestroy {

    @ViewChild('preview', { static: true })
    previewElemRef: ElementRef<HTMLVideoElement>;
    scanner: IScanner;

    constructor(
        private _navController: NavController,
        private _scannerService: ScannerService,
        private _scannerTipService: ScannerTipService,
        menuController: MenuController,
        toastController: ToastController,
        loadingController: LoadingController,
        store: Store<IAppState>,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController
    ) {
        super(menuController, toastController, loadingController, store,
            platformService, screenOrientationService, alertController);
        this.scanner = ScannerFactory.CreateScanner();
        this._scannerService.HasNavigator = typeof navigator !== 'undefined';
        this._scannerService.MediaDeviceSuported =
            this._scannerService.HasNavigator && !!navigator.mediaDevices;
        
    }

    async ngOnInit() {
        this.setupStateSubsciptions();
        this.setupScannerSubscriptions();
        await this.initializeCamera();
        this.scanner.ScreenLoaded = true;
    }

    ionViewWillEnter() {
        this.platformService.ready().then(() => {
            this.setMenus();
        });
    }

    private async initializeCamera() {
        this.scanner.UpdatingScanner = true;
        let loadingElement = await this.loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: LoadingConstants.CHECKING_BROWSER_COMPATIBILITY
        });
        await loadingElement.present();
        try {
            if ( !this._scannerService.HasNavigator
                && this._scannerService.MediaDeviceSuported
            ) {
                throw (ManifestManagerErrorFactory.CreateManifestManagerError(
                    FunctionType.ScanningBrowser,
                    ErrorConstants.ERROR_MESSAGE_BROWSER_NOT_SUPPORTED
                ));
            }
            await loadingElement.setAttribute('message', LoadingConstants.SETTING_CAMERA_SUBSCRIPTIONS)
            this._scannerService.PreviewElement = this.previewElemRef;
            await this.setupCameraSubscriptions();
            await loadingElement.setAttribute('message', LoadingConstants.DETERMINING_CAMERA_PERMISSIONS);
            await this._scannerService.askPermissionFromUser();
            await loadingElement.setAttribute('message', LoadingConstants.INITIALIZING_CAMERA);
            this.scanner.ScannerEnabled = await this._scannerService.enableCamera(true);
            await loadingElement.dismiss()
                .then(() => {
                    this.onResize();
                    this.scanner.UpdatingScanner = false;
                });
        } catch (error) {
            await loadingElement.dismiss()
                .then(() => {
                    this.onResize();
                    this.scanner.UpdatingScanner = false;
                    this.displayError(this._scannerService.createCameraError(error));
                });
        }
    }

    addScannedPersonToManifest(scannedText: string): void {
        this.newPerson = PersonFactory.CreatePersonFromScan(
            this.manifestId,
            scannedText,
            this.userId);

        this.loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: LoadingConstants.ADDING_PERSON
        })
            .then(loadingElement => {
                this.store.dispatch(PersonActionFactory.CreateAddPersonStart(this.newPerson));
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
                                if (this.addPersonResult.Success) {
                                    this.displayAddSuccess(this.addPersonResult.Message);
                                } else {
                                    this.displayAddByScanningError(this.addPersonResult);
                                }
                            })
                    })
            });
    }

    displayAddByScanningError(error: IManifestManagerError): void {
        
        this.alertController.create({
            header: this.addPersonResult.ErrorTitle,
            message: this.addPersonResult.ErrorMessage,
            buttons: [{
                text: MessageConstants.OK, handler: () => {
                    this._scannerService.setIsScanningPaused(false);
                    console.log('Scan continued.');
                }
            }]
        }).then(alertElement => {
            alertElement.present();
        });
    }

    async displayAddSuccess(sucessMessage: string) {
        const toast = await this.toastController.create({
            header: ScannerConstants.ADD_SUCCESS_TITLE,
            message: sucessMessage,
            position: 'middle',
            buttons: [
                {
                    text: MessageConstants.OK,
                    role: 'cancel',
                    handler: () => {
                        this._scannerService.setIsScanningPaused(false);
                        console.log('Scan continued.');
                    }
                }
            ]
        });
        toast.present();
    }

    async setLight(on: boolean | undefined) {
        let newLightValue: boolean;
        let currentAutofocusValue: boolean | null;
        if (on !== undefined) {
            newLightValue = on;
        } else {
            newLightValue = !this.scanner.LightOn;
        }
        if (!this.scanner.AutofocusCompatible) {
            currentAutofocusValue = null;
        } else {
            currentAutofocusValue = this.scanner.AutofocusOn;
        }
        this.scanner.UpdatingScanner = true;
        let userMessage = this.scanner.LightOn ? LoadingConstants.RELOADING_VIDEO_STREAM_LIGHT_OFF :
            LoadingConstants.RELOADING_VIDEO_STREAM_LIGHT_ON
        let loadingElement = await this.loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: userMessage
        });
        await loadingElement.present();
        try {
            this.scanner.LightOn = await this._scannerService.setTorch(newLightValue, currentAutofocusValue);
            loadingElement.dismiss();
            this.scanner.UpdatingScanner = false;
        } catch (error) {
            loadingElement.dismiss();
            this.scanner.UpdatingScanner = false;
            this.displayError(this._scannerService.createCameraError(error));
        }
    }

    async setAutofocus(on: boolean | undefined) {
        let newAutofocusValue: boolean;
        let currentLightValue: boolean | null;
        if (on !== undefined) {
            newAutofocusValue = on;
        } else {
            newAutofocusValue = !this.scanner.AutofocusOn;
        }
        if (!this.scanner.LightCompatible) {
            currentLightValue = null;
        } else {
            currentLightValue = this.scanner.LightOn;
        }

        this.scanner.UpdatingScanner = true;
        let userMessage = this.scanner.AutofocusOn ? LoadingConstants.RELOADING_VIDEO_STREAM_AUTOFOCUS_OFF :
            LoadingConstants.RELOADING_VIDEO_STREAM_AUTOFOCUS_ON;
        let loadingElement = await this.loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: userMessage
        });
        await loadingElement.present();
        try {
            this.scanner.AutofocusOn = await this._scannerService.setAutofocus(newAutofocusValue, currentLightValue);
            loadingElement.dismiss();
            this.scanner.UpdatingScanner = false;
        } catch (error) {
            loadingElement.dismiss();
            this.scanner.UpdatingScanner = false;
            this.displayError(this._scannerService.createCameraError(error));
        }
    }

    updateVideoWidthDisplay(): void {
        if (!this.isLandscape || this.isIpad || this.isTablet) {
            this.scanner.DisplayFullVideoWidth = true;
        } else {
            this.scanner.DisplayFullVideoWidth = false;
        }
    }

    async displayInformation() {
        this.scanner.InfoOn = true;
        const alert = await this.alertController.create({
            header: this._scannerTipService.scannerTip.InformationTitle,
            message: this._scannerTipService.scannerTip.Information,
            cssClass: 'tip',
            translucent: true,
            buttons: [{
                text: MessageConstants.OK,
                handler: () => {
                    alert.dismiss();
                    this.scanner.InfoOn = false;
                }
            }]
        });

        await alert.present();
    }

    navigateBack() {
        this._navController.navigateBack('/manifest-details');
    }

    onResize(): void {
        super.onResize();
        if (this.isMobile) {
            this.previewElemRef.nativeElement.height = this.deviceHeight;
            this.previewElemRef.nativeElement.width = this.deviceWidth;
            this.updateVideoWidthDisplay();
        }
    }

    private async setupStateSubsciptions(): Promise<void> {
        this.addPersonSubscription = this.store.select('personState').subscribe(personState => {
            this.manifestId = personState.manifestId;
            this.addPersonResult = personState.personError;
            this.isLoading = personState.loadingPersonList;
        });

        this.authStateSubscription = this.store.select('authState').subscribe(authState => {
            this.userId = authState.user.UserId;
        });
    }

    private async setupScannerSubscriptions(): Promise<void> {
        this.scanner.StatusSubscription = this._scannerService.ScannerStatusChanged.subscribe(scannerStatus => {
            this.scanner.Status = scannerStatus;
        });

        this.scanner.ResultSubscription = this._scannerService.ScanSuccessChanged.subscribe(scanResult => {
            this.addScannedPersonToManifest(scanResult);
        });
    }

    private async setupCameraSubscriptions(): Promise<void> {
        try {
            this.scanner.LightSubscription = this._scannerService.getCodeReader().isTorchAvailable.subscribe(isAvailable => {
                this.scanner.LightCompatible = isAvailable;
                this.scanner.LightEnabled = isAvailable;
                // possibly move this an other display messages to store; not sure yet.
                this._scannerTipService.setScanInformation(this.scanner.LightCompatible, this.scanner.AutofocusCompatible);

            });
            this.scanner.AutofocusSubscription = this._scannerService.getCodeReader().isAutofocusAvailable.subscribe(isAvailable => {
                this.scanner.AutofocusCompatible = isAvailable;
                this.scanner.AutofocusEnabled = isAvailable;
                // possibly move this an other display messages to store; not sure yet.
                this._scannerTipService.setScanInformation(this.scanner.LightCompatible, this.scanner.AutofocusCompatible);
            });
        } catch (error) {
            throw (ManifestManagerErrorFactory.CreateManifestManagerError(
                FunctionType.ScanningCamera,
                ErrorConstants.ERROR_MESSAGE_CAMERA_GET_SUBSCRIPTIONS + error
            ));
        }
    }

    private async updateLightFromCameraChange(): Promise<void> {
        if (!this.scanner.ScannerEnabled) {
            await this.setLight(false);
            this.scanner.LightEnabled = false;
        } else {
            this.scanner.LightEnabled = this.scanner.LightCompatible;
        }
    }

    private async updateAutofocusFromCameraChange(): Promise<void> {
        if (!this.scanner.ScannerEnabled) {
            await this.setAutofocus(false);
            this.scanner.AutofocusEnabled = false;
        } else {
            this.scanner.AutofocusEnabled = this.scanner.AutofocusCompatible;
        }
    }

    private async turnCameraOff(): Promise<void> {
        this.scanner.UpdatingScanner = true;
        let userMessage = LoadingConstants.DISABLING_VIDEO_STREAM;
        let loadingElement = await this.loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: userMessage
        });
        await loadingElement.present();
        try {
            this.scanner.ScannerEnabled = await this._scannerService.enableCamera(false);
            await loadingElement.dismiss()
                .then(() => this.onResize());
            await this.updateLightFromCameraChange();
            await this.updateAutofocusFromCameraChange();
            this.scanner.UpdatingScanner = false;
        } catch (error) {
            loadingElement.dismiss()
                .then(() => this.updateVideoWidthDisplay());
            this.scanner.UpdatingScanner = false;
            this.displayError(this._scannerService.createCameraError(error));
        }
    }

    async ngOnDestroy() {
        if (this.scanner.ScannerEnabled) {
            await this.turnCameraOff();
        }
        this._scannerService.stopScanning();
        this._scannerService.stopCamera();

        if (this.scanner.LightSubscription) {
            this.scanner.LightSubscription.unsubscribe();
        }
        if (this.scanner.AutofocusSubscription) {
            this.scanner.AutofocusSubscription.unsubscribe();
        }
        if (this.scanner.StatusSubscription) {
            this.scanner.StatusSubscription.unsubscribe();
        }
        if (this.scanner.ResultSubscription) {
            this.scanner.ResultSubscription.unsubscribe();
        }

        if (this.authStateSubscription) {
            this.authStateSubscription.unsubscribe();
        }

        if (this.addPersonSubscription) {
            this.addPersonSubscription.unsubscribe();
        }

        this.store.dispatch(PersonActionFactory.CreateStopEdit());
    }
}
