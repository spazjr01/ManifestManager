// Angular libraries
import { Input, Output, Directive, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { Observable } from 'rxjs';
import { IManifest } from '../../models/interfaces/manifest.interface';
import { DeleteManifestComponent } from '../../components/delete-manifest/delete-manifest.component';
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { ManifestActionFactory } from '../../store/factories/manifest-action.factory';
import { ActionSheetConstants } from '../../shared/constants/action-sheet.constants';

@Directive()
export abstract class ManifestMainSharedComponent extends BaseComponent {
    
    private _subFunctionClicked: boolean;
    @Input() manifestsForSubcomponent: Observable<{ manifestList: IManifest[] }>;
    @Output() manifestDeleted = new EventEmitter<IManifest>();

    manifestListFromParent: IManifest[];

    constructor(
        protected store: Store<IAppState>, 
        protected router: Router,
        protected modalController: ModalController,
        protected actionSheetController: ActionSheetController,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController
    ) {
        super(platformService, screenOrientationService, alertController, store);
        this._subFunctionClicked = false;
        this.manifestsForSubcomponent = new Observable<{ manifestList: IManifest[] }>();
        //this.manifestsForSubcomponent = [];
    }

    onEdit(manifest: IManifest): void {
        this._subFunctionClicked = true;
        this.store.dispatch(ManifestActionFactory.CreateStartEdit(manifest));
        this.router.navigate(['/', 'manifest', 'edit']);
    }

    async onDelete(manifest: IManifest) {
        this._subFunctionClicked = true;
        this.store.dispatch(ManifestActionFactory.CreateStartEdit(manifest));
        await this.openDeleteModal();
    }

    private async openDeleteModal() {
        const modal = await this.modalController.create({
            component: DeleteManifestComponent
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
                    text: ActionSheetConstants.OPEN_MANIFEST,
                    handler: () => this.NavigateToManifestDetails(manifestId, manifestName),
                    icon: 'list-outline'
                },
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
                    text: ActionSheetConstants.SEND_TO_COVID19_TASK_FORCE,
                    handler: () => this.SendToUnit(manifestId),
                    icon: 'send'
                },
                {
                    text: ActionSheetConstants.SEND_TRN_TO_EMAIL,
                    handler: () => this.SendToUnit(manifestId),
                    icon: 'mail-outline'
                },
                {
                    text: ActionSheetConstants.SEND_EXCEL_TO_EMAIL,
                    handler: () => this.SendToUnit(manifestId),
                    icon: 'mail-outline'
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
                    text: ActionSheetConstants.ADD_TO_DTAS,
                    handler: () => this.ExportToExcel(manifestId),
                    icon: 'add-circle'
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

    ToggleManifest(manifest: IManifest): void {
        this.store.dispatch(ManifestActionFactory.CreateStartEdit(manifest));
        let editedManifest: IManifest = { ...manifest };
        editedManifest.ShowDetails = !manifest.ShowDetails;
        this.store.dispatch(ManifestActionFactory.CreateEditManifestClientOnly(editedManifest));
        this._subFunctionClicked = true;
        this.store.dispatch(ManifestActionFactory.CreateStopEdit());
    }

    NavigateToManifestDetails(manId: number, manifestName: string): void {

        if (this._subFunctionClicked) {
            this._subFunctionClicked = false;
            return;
        }
        this.router.navigate(['/', 'manifest-details'], { queryParams: { manifestId: manId }, fragment: manifestName });
    }
}