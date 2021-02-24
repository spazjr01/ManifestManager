// Angular libraries
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, AlertController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager libraries
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {

    constructor(screenPlatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController, 
        store: Store<IAppState>
    ) {
        super(screenPlatformService, screenOrientationService,
            alertController, store);
    }

}
