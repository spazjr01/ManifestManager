// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subscription } from 'rxjs';

// Manifest Manager classes and components
import { BaseComponent } from '../../shared/base.component';
import { ISetting } from '../../models/interfaces/setting.interface';
import { MessageConstants } from '../../shared/constants/message.constants';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { SettingActionFactory } from '../../store/factories/setting-action.factory';
import { ErrorType } from '../../shared/enumerations/enumerations';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends BaseComponent implements OnInit, OnDestroy {

    private _settingSubscription: Subscription;
    settings: ISetting[];

    constructor(
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(platformService, screenOrientationService,
            alertController, store);
        this.settings = [];
        this._settingSubscription = new Subscription();
    }

    ngOnInit() {
        this._settingSubscription = this.store.select('settingState').subscribe(settingState => {
            this.settings = settingState.settings;
            this.isLoading = settingState.loading;
            this.error = settingState.settingError;

            if (this.error.ErrorType !== ErrorType.NoError) {
                this.displayError(this.error);
            }
        });
    }

    updateSetting(setting: ISetting, event: CustomEvent): void {
        if (setting.Active !== event.detail.checked) {
            let editedSetting: ISetting = { ...setting };
            editedSetting.Active = !setting.Active;
            this.store.dispatch(SettingActionFactory.CreateStartEdit(editedSetting));
            this.store.dispatch(SettingActionFactory.CreateEditSettingClientOnly(editedSetting));
            this.store.dispatch(SettingActionFactory.CreateStopEdit());
        }
        
    }

    async DisplayInformation(setting: ISetting) {
        const alert = await this.alertController.create({
            header: setting.Name,
            message: setting.Description,
            mode: 'ios',
            translucent: true,
            buttons: [MessageConstants.OK]
        });

        await alert.present();
    }

    ngOnDestroy() {
        if (this._settingSubscription) {
            this._settingSubscription.unsubscribe();
        }
    }


}
