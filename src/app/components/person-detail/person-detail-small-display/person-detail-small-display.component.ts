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
  selector: 'app-person-detail-small-display',
  templateUrl: './person-detail-small-display.component.html',
  styleUrls: ['./person-detail-small-display.component.scss'],
})

export class PersonDetailSmallDisplayComponent extends PersonDetailSharedComponent {

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
