// Angular libraries
import { Input, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, Platform, ActionSheetController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IPerson } from '../../models/interfaces/person.interface';
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';

@Directive()
export abstract class PersonDetailSharedComponent extends BaseComponent {
    
    @Input() personForSubcomponent: IPerson;

    constructor(
        protected router: Router,
        protected modalController: ModalController,
        protected actionSheetController: ActionSheetController,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(platformService, screenOrientationService,
            alertController, store);
    }
}