// Angular libraries
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { PersonDetailSharedComponent } from '../person-detail-shared.component';
import { IAppState } from '../../../store/interfaces/app-state.interface';

@Component({
  selector: 'app-person-detail-large-display',
  templateUrl: './person-detail-large-display.component.html',
  styleUrls: ['./person-detail-large-display.component.scss'],
})
export class PersonDetailLargeDisplayComponent extends PersonDetailSharedComponent {

    constructor(
        router: Router,
        modalController: ModalController,
        actionSheetController: ActionSheetController,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(
            router,
            modalController,
            actionSheetController,
            platformService,
            screenOrientationService,
            alertController,
            store
        );
    }

}
