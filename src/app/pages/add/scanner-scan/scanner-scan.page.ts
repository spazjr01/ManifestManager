// Angular libraries
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, AlertController, ToastController, LoadingController, MenuController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { PersonFactory } from '../../../models/factories/person.factory';
import { IAppState } from '../../../store/interfaces/app-state.interface';
import { IManifestManagerError } from '../../../models/interfaces/manifest-manager-error.interface';
import { PersonActionFactory } from '../../../store/factories/person-action.factory';
import { ScannerConstants } from '../../../shared/constants/scanner.constants';
import { LoadingConstants } from '../../../shared/constants/loading.constants';
import { MessageConstants } from '../../../shared/constants/message.constants';
import { AddPersonSharedComponent } from '../../../pages/add/add-person-shared.component';

@Component({
    selector: 'app-scanner-scan',
    templateUrl: './scanner-scan.page.html',
    styleUrls: ['./scanner-scan.page.scss'],
})
export class ScannerScanPage extends AddPersonSharedComponent {

    manifestIdTest: number;
    scanMessage: string;

    @ViewChild('scanInput') scanInput;

    constructor(
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
      }

    ionViewWillEnter(): void {
        this.platformService.ready().then(() => {
            this.setMenus();
            // TODO: add code to reset the focus of the input field when this menu closes.
            // I'm not sure what sure what this logic is or where the code should be, yet.  
            // I need to research.
        });
    }

    ionViewDidEnter(): void {
        this.scanInput.setFocus();
        this.scanMessage = ScannerConstants.WAITING_TO_RECEIVE_SCAN;
    } 


    onScanReceived(scanResultObject: CustomEvent): void {
        if (scanResultObject.detail.value && scanResultObject.detail.value.length !== 0) {
            this.scanMessage = ScannerConstants.SCAN_RECEIVED;
            this.addScannedPersonToManifest(scanResultObject.detail.value.toUpperCase());
        }
        this.scanInput.setFocus();
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
                    this.scanInput.value = '';
                    this.scanMessage = ScannerConstants.WAITING_TO_RECEIVE_SCAN;
                    this.scanInput.setFocus();
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
                        this.scanInput.value = '';
                        this.scanMessage = ScannerConstants.WAITING_TO_RECEIVE_SCAN;
                        this.scanInput.setFocus();
                    }
                }
            ]
        });
        toast.present();
    }
}
