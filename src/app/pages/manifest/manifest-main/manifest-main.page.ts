// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { MenuController, Platform, AlertController } from '@ionic/angular';

// Other libraries
import { Subscription, Observable, of } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IManifest } from '../../../models/interfaces/manifest.interface';
import { BaseComponent } from '../../../shared/base.component';
import { IAppState } from '../../../store/interfaces/app-state.interface';
import { IManifestState } from '../../../store/interfaces/manifest-state.interface';
import { ManifestActionFactory } from '../../../store/factories/manifest-action.factory';
import { ErrorType } from '../../../shared/enumerations/enumerations';
import { MenuConstants } from '../../../shared/constants/menu.constants';

@Component({
    selector: 'app-manifest-main',
    templateUrl: './manifest-main.page.html',
    styleUrls: ['./manifest-main.page.scss'],
})

export class ManifestMainPage extends BaseComponent implements OnInit, OnDestroy {

    manifests: Observable<{ manifestList: IManifest[] }>;
    unit: string;
    private _uic: string;
    private _uicName: string;
    private _manifestSubscription: Subscription;

    constructor(
        private _menuController: MenuController,
        private _activatedRoute: ActivatedRoute,
        screenplatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenplatformService, screenOrientationService,
            alertController, store);
        this._manifestSubscription = new Subscription();
        this.manifests = new Observable<{ manifestList: IManifest[] }>();

        this._uic = '';
        this._uicName = '';
        this.unit = '';
    }

    ngOnInit(): void {
        this._uic = this._activatedRoute.snapshot.queryParams['uic'];
        this._uicName = this._activatedRoute.snapshot.fragment;
        this.unit = this.getUnit();
        
        this._manifestSubscription = this.store.select('manifestState')
            .subscribe((manifestState: IManifestState) => {
                this.manifests = of({ manifestList: manifestState.manifests });
                this.error = manifestState.manifestError;
                this.isLoading = manifestState.loadingManifestList;
                if (this.error.ErrorType === ErrorType.GetManifestsError) {
                    this.displayError(this.error);
                }
            });
    }

    ionViewWillEnter(): void {
        this.store.dispatch(ManifestActionFactory.CreateGetManifests(this._uic));

        this.platformService.ready().then(() => {
            this._menuController.enable(false, MenuConstants.UNIT_MENU);
            this._menuController.enable(true, MenuConstants.MANIFEST_MENU);
            this._menuController.enable(false, MenuConstants.MANIFEST_DETAIL_MENU);
            this.deviceWidth = this.platformService.width();
        });
    }

    private getUnit(): string {
        if (this.isDesktop || this.isIpad || this.isTablet) {
            return this._uic + ' - ' + this._uicName;
        }
        else {
            return this._uic;
        }
    }

    ngOnDestroy(): void {
        if (this._manifestSubscription) {
            this._manifestSubscription.unsubscribe();
        }
    }
}
