// Angular libraries
import { Input, Output, Directive, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IPerson } from '../../models/interfaces/person.interface';
import { DeletePersonComponent } from '../../components/delete-person/delete-person.component';
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { PersonActionFactory } from '../../store/factories/person-action.factory';
import { ActionSheetConstants } from '../../shared/constants/action-sheet.constants';

@Directive()
export abstract class ManifestDetailSharedComponent extends BaseComponent {
    
    private _subFunctionClicked: boolean;
    @Input() manifestedPersonnelForSubcomponent: IPerson[];
    @Output() personDeleted = new EventEmitter<number>();

    constructor(
        protected router: Router,
        protected modalController: ModalController,
        protected actionSheetController: ActionSheetController,
        protected store: Store<IAppState>,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController
    ) {
        super(platformService, screenOrientationService,
            alertController, store);
        this._subFunctionClicked = false;
        this.manifestedPersonnelForSubcomponent = [];
    }

    async onDelete(person: IPerson) {
        this._subFunctionClicked = true;
        this.store.dispatch(PersonActionFactory.CreateStartEdit(person));
        await this.openDeleteModal();
    }

    private async openDeleteModal() {
        const modal = await this.modalController.create({
            component: DeletePersonComponent
        });

        return await modal.present();
    }

    onManifestSubmenuSelect(manifestId: number, manifestName: string): void {
        this._subFunctionClicked = true;
        console.log('onManifestSubmenuSelect was initiated. Selected ManifestID:', manifestId);
        this.actionSheetController.create({
            header: ActionSheetConstants.SELECT_ACTION_FOR_MANIFEST + manifestName,
            mode: 'ios',
            translucent: true,
            cssClass: 'left-align-buttons submenu-background',
            buttons: [
                {
                    text: ActionSheetConstants.SEND_TO_APOD,
                    handler: () => this.SendToApod(manifestId),
                    icon: 'send-outline'
                },
                {
                    text: ActionSheetConstants.SEND_TO_UNIT,
                    handler: () => this.SendToUnit(manifestId),
                    icon: 'send'
                },
                {
                    text: ActionSheetConstants.EXPORT_TO_TRN,
                    handler: () => this.ExportToTrn(manifestId),
                    icon: 'document-text-outline'
                },
                {
                    text: ActionSheetConstants.EXPORT_TO_EXCEL,
                    handler: () => this.ExportToExcel(manifestId),
                    icon: 'grid-outline'
                },
                {
                    text: ActionSheetConstants.CANCEL,
                    role: 'cancel',
                    icon: 'close-outline'
                }
            ]
        }).then(actionSheetElement => {
            actionSheetElement.present();
        });
    }

    // Move to a service class later.  Will need an Sent to Apod/Unit page.
    SendToApod(manifestId: number): void {
        console.log('Sent the following manifest to the APOD.  ManifestID:', manifestId);
    }

    // Move to a service class later.  Will need an Sent to Apod/Unit page.
    SendToUnit(manifestId: number): void {
        console.log('Sent the following manifest to the unit.  ManifestID:', manifestId);
    }

    // Move to a service class later.  I already have previously built logic for 
    // building a TRN file.  I need to retrieve this from my previous Xamarin Forms Mobile TPS solution.
    // It will require refactoring of course.  This function will not be available 
    // unless this app is running on a desktop (in the initial version).  Otherwise, there will be security 
    // problems to overcome.
    ExportToTrn(manifestId: number): void {
        console.log('Exported the following manifest to a TRN file.  ManifestID:', manifestId);
    }

    // Move to a service class later.  I will have to build this from scratch(I think).  Current TPS desktop
    // version simply copies and pasts the manifest grid into an excel document.  I won't
    // be able to do this here.  This function will not be available 
    // unless this app is running on a desktop (in the initial version).  Otherwise, there will be security 
    // problems to overcome.
    ExportToExcel(manifestId: number): void {
        console.log('Exported the following manifest to an Excel file.  ManifestID:', manifestId);
    }

    ToggleManifest(person: IPerson): void {
        person.ShowDetails = !person.ShowDetails;
        this._subFunctionClicked = true;
    }

    NavigateToPersonDetails(person: IPerson): void {

        if (this._subFunctionClicked) {
            this._subFunctionClicked = false;
            return;
        }
        this.store.dispatch(PersonActionFactory.CreateStartEdit(person)); 
        this.router.navigate(['/', 'manifest-details', 'view-person']);
    }
}