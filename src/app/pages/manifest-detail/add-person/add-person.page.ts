// Angular libraries
import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, MenuController, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { BaseComponent } from '../../../shared/base.component';
import { MenuConstants } from '../../../shared/constants/menu.constants';
import { IAppState } from '../../../store/interfaces/app-state.interface';

@Component({
    selector: 'app-add-person',
    templateUrl: './add-person.page.html',
    styleUrls: ['./add-person.page.scss'],
})

export class AddPersonPage extends BaseComponent {

    manifestId: number;
    manifestIdTest: number;
    selectedPath: string = '';
    functionTitle: string;
    constructor(
        private _router: Router,
        private _menuController: MenuController,
        screenplatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenplatformService, screenOrientationService,
            alertController, store);
        this.functionTitle = 'Add Person';
    }

    ngOnInit() {
        this._router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
                if (this.selectedPath.indexOf('manual') === -1) {
                    this.functionTitle = 'Add Person';
                } else {
                    this.functionTitle = 'Add Person';
                }
            }
        });
    }

    ionViewWillEnter(): void {
        this.platformService.ready().then(() => {
            this._menuController.enable(false, MenuConstants.UNIT_MENU);
            this._menuController.enable(false, MenuConstants.MANIFEST_MENU);
            this._menuController.enable(true, MenuConstants.MANIFEST_DETAIL_MENU);
        });
    }
}
