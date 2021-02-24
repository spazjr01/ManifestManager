// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, MenuController, AlertController } from '@ionic/angular';

// Other libraries
import { Subscription, Subscribable } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IAuthUnit } from '../../models/interfaces/auth-unit.interface';
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { IAuth } from '../../models/interfaces/auth.interface';
import { AuthUnitActionFactory } from '../../store/factories/auth-unit-action.factory';
import { ErrorType } from '../../shared/enumerations/enumerations';
import { MenuConstants } from '../../shared/constants/menu.constants';

@Component({
    selector: 'app-auth-unit',
    templateUrl: './auth-unit.page.html',
    styleUrls: ['./auth-unit.page.scss'],
})

export class AuthUnitPage extends BaseComponent implements OnInit, OnDestroy {
    authorizedUnits: IAuthUnit[];
    private _authUser: IAuth;
    private _authUnitsSubscription: Subscription;
    private _authStateSubscription: Subscription;

    constructor(
        private _menuController: MenuController,
        screenPlatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenPlatformService, screenOrientationService,
            alertController, store);
        this.authorizedUnits = [];
        this._authUnitsSubscription = new Subscription();
        this._authStateSubscription = new Subscription();
    }

    ngOnInit() {
        this._authStateSubscription = this.store.select('authState').subscribe(authState => {
            this._authUser = authState.user;
        });

        this._authUnitsSubscription = this.store.select('authUnitState').subscribe(authUnitState => {
            this.authorizedUnits = authUnitState.authUnits;
            this.isLoading = authUnitState.loading;
            this.error = authUnitState.authUnitError;
            if (this.error.ErrorType !== ErrorType.NoError) {
                this.displayError(this.error);
            }
        });

        this.store.dispatch(AuthUnitActionFactory.CreateGetAuthUnits(this._authUser));
    }

    ionViewDidEnter() {
        this.platformService.ready().then(() => {
            this._menuController.enable(true, MenuConstants.UNIT_MENU);
            this._menuController.enable(false, MenuConstants.MANIFEST_MENU);
            this._menuController.enable(false, MenuConstants.MANIFEST_DETAIL_MENU);
        });
    }

    ngOnDestroy() {
        if (this._authStateSubscription) {
            this._authStateSubscription.unsubscribe();
        }

        if (this._authUnitsSubscription) {
            this._authUnitsSubscription.unsubscribe();
        }
    }
}
