// Angular libraries
import { Directive, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import {
    Platform, AlertController, MenuController,
    ToastController, LoadingController
} from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subscription } from 'rxjs';

// Manifest Manager classes and components
import { IPerson } from '../../models/interfaces/person.interface';
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';
import { ManifestManagerErrorFactory } from '../../models/factories/manifest-manager-error.factory';
import { PersonActionFactory } from '../../store/factories/person-action.factory';
import { MenuConstants } from '../../shared/constants/menu.constants';

@Directive()
export abstract class AddPersonSharedComponent extends BaseComponent implements OnInit, OnDestroy {

    protected newPerson: IPerson;
    protected userId: string;
    protected authStateSubscription: Subscription;
    protected addPersonSubscription: Subscription;
    protected addPersonResult: IManifestManagerError;
    protected manifestId: number;

    constructor(
        protected menuController: MenuController,
        protected toastController: ToastController,
        protected loadingController: LoadingController,
        protected store: Store<IAppState>,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController
    ) {
        super(platformService, screenOrientationService,
            alertController, store);
        this.userId = '';
        this.authStateSubscription = new Subscription();
        this.addPersonSubscription = new Subscription();
        this.addPersonResult = ManifestManagerErrorFactory.CreateNoError();
    }

    ngOnInit() {
        this.addPersonSubscription = this.store.select('personState').subscribe(personState => {
            this.manifestId = personState.manifestId;
            this.addPersonResult = personState.personError;
            this.isLoading = false;//personState.loadingPerson;
        });

        this.authStateSubscription = this.store.select('authState').subscribe(authState => {
            this.userId = authState.user.UserId;
        });
    }

    setMenus() {
        this.menuController.enable(false, MenuConstants.UNIT_MENU);
        this.menuController.enable(false, MenuConstants.MANIFEST_MENU);
        this.menuController.enable(true, MenuConstants.MANIFEST_DETAIL_MENU);
    }

    ngOnDestroy(): void {
        if (this.authStateSubscription) {
            this.authStateSubscription.unsubscribe();
        }

        if (this.addPersonSubscription) {
            this.addPersonSubscription.unsubscribe();
        }

        this.store.dispatch(PersonActionFactory.CreateStopEdit());
    }
}