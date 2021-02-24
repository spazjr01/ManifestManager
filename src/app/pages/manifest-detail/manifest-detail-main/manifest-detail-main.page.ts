// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { MenuController, Platform, AlertController } from '@ionic/angular';

// Other libraries
import { Subscription } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IPerson } from '../../../models/interfaces/person.interface';
import { BaseComponent } from '../../../shared/base.component';
import { IAppState } from '../../../store/interfaces/app-state.interface';
import { IPersonState } from '../../../store/interfaces/person-state.interface';
import { ErrorType } from '../../../shared/enumerations/enumerations';
import { PersonActionFactory } from '../../../store/factories/person-action.factory';
import { MenuConstants } from '../../../shared/constants/menu.constants';

@Component({
    selector: 'app-manifest-detail-main',
    templateUrl: './manifest-detail-main.page.html',
    styleUrls: ['./manifest-detail-main.page.scss'],
})
export class ManifestDetailMainPage extends BaseComponent implements OnInit, OnDestroy {

    manifestName: string;
    manifestedPersonnel: IPerson[];
    manifestId: number;
    private _personListSubscription: Subscription;
    
    constructor(
        private _menuController: MenuController,
        private _activatedRoute: ActivatedRoute,
        screenplatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenplatformService, screenOrientationService,
            alertController, store)
        this.manifestedPersonnel = [];
        this._personListSubscription = new Subscription();
        this.manifestName = ''
    }

    ngOnInit() {
        this.manifestId = this._activatedRoute.snapshot.queryParams['manifestId'];
        this.manifestName = this._activatedRoute.snapshot.fragment;

        this._personListSubscription = this.store.select('personState')
            .subscribe((personState: IPersonState) => {
                this.manifestedPersonnel = personState.persons;
                this.error = personState.personError;
                this.isLoading = personState.loadingPersonList;
                if (this.error.ErrorType === ErrorType.GetManifestDetailsError) {
                    this.displayError(this.error);
                }
            });
    }

    ionViewWillEnter(): void {

        this.store.dispatch(PersonActionFactory.CreateGetManifestDetails(this.manifestId));

        this.platformService.ready().then(() => {
            this._menuController.enable(false, MenuConstants.UNIT_MENU);
            this._menuController.enable(false, MenuConstants.MANIFEST_MENU);
            this._menuController.enable(true, MenuConstants.MANIFEST_DETAIL_MENU);
            this.deviceWidth = this.platformService.width();
        });
    }

    ngOnDestroy() {
        if (this._personListSubscription) {
            this._personListSubscription.unsubscribe();
        }
    }
}
