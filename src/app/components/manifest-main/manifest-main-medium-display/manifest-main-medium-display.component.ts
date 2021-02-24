// Angular libraries
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { ManifestMainSharedComponent } from '../manifest-main-shared.component';
import { IAppState } from '../../../store/interfaces/app-state.interface';

@Component({
    selector: 'app-manifest-main-medium-display',
    templateUrl: './manifest-main-medium-display.component.html',
    styleUrls: ['./manifest-main-medium-display.component.scss'],
})

export class ManifestMainMediumDisplayComponent extends ManifestMainSharedComponent {

    constructor(
        store: Store<IAppState>,
        router: Router,
        modalController: ModalController,
        actionSheetController: ActionSheetController,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController
    ) {
        super(
            store,
            router,
            modalController,
            actionSheetController,
            platformService,
            screenOrientationService,
            alertController
        );
    }
}
