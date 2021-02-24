// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { MenuController, Platform, AlertController } from '@ionic/angular';

// Other libraries
import { Subscription } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IPerson } from '../../../models/interfaces/person.interface';
import { BaseComponent } from '../../../shared/base.component';
import { PersonFactory } from '../../../models/factories/person.factory';
import { IAppState } from '../../../store/interfaces/app-state.interface';
import { PersonActionFactory } from '../../../store/factories/person-action.factory';
import { MenuConstants } from '../../../shared/constants/menu.constants';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage extends BaseComponent implements OnInit, OnDestroy {

    private _personSubscription: Subscription;
    person: IPerson;

    constructor(
        private _menuController: MenuController,
        screenplatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenplatformService, screenOrientationService,
            alertController, store)
        this._personSubscription = new Subscription();
        this.person = PersonFactory.CreateGenericPerson();
    }

    ngOnInit() {
        this._personSubscription = this.store.select('personState').subscribe(personState => {
            this.person = personState.editedPerson;
        });
    }

    ionViewWillEnter(): void {
        this.platformService.ready().then(() => {
            this._menuController.enable(false, MenuConstants.UNIT_MENU);
            this._menuController.enable(false, MenuConstants.MANIFEST_MENU);
            this._menuController.enable(true, MenuConstants.MANIFEST_DETAIL_MENU);
            this.deviceWidth = this.platformService.width();
        });
    }

    ngOnDestroy() {
        if (this._personSubscription) {
            this._personSubscription.unsubscribe();
        }

        this.store.dispatch(PersonActionFactory.CreateStopEdit());
    }

}
