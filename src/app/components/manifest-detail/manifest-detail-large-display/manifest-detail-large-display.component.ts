// Angular libraries
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { ManifestDetailSharedComponent } from '../manifest-detail-shared.component';

import { IAppState } from '../../../store/interfaces/app-state.interface';

@Component({
  selector: 'app-manifest-detail-large-display',
  templateUrl: './manifest-detail-large-display.component.html',
  styleUrls: ['./manifest-detail-large-display.component.scss'],
})
export class ManifestDetailLargeDisplayComponent extends ManifestDetailSharedComponent {

    constructor(
        router: Router,
        modalController: ModalController,
        actionSheetController: ActionSheetController,
        store: Store<IAppState>,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController
    ) {
        super(
            router,
            modalController,
            actionSheetController,
            store,
            platformService,
            screenOrientationService,
            alertController
        );
    }
}
