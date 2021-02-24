// Angular libraries
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IManifestManagerError } from '../models/interfaces/manifest-manager-error.interface';
import { MessageConstants } from '../shared/constants/message.constants';
import { IAppState } from '../store/interfaces/app-state.interface';
import { ManifestManagerErrorFactory } from '../models/factories/manifest-manager-error.factory';

export abstract class BaseComponent {

    isLandscape: boolean = false;
    isDesktop: boolean = false;
    isIpad: boolean = false;
    isTablet: boolean = false;
    isAndroid: boolean = false;
    isIos: boolean = false;
    isMobile: boolean = false;
    deviceWidth: number = 0;
    deviceHeight: number = 0;
    isLoading: boolean = false;
    error: IManifestManagerError;

    

    constructor(
        protected platformService: Platform,
        protected screenOrientationService: ScreenOrientation,
        protected alertController: AlertController,
        protected store: Store<IAppState>
    ) {
        this.isLandscape = this.screenOrientationService.type.includes('landscape');
        this.setPlatformIdentifiers();
        this.screenOrientationService.onChange().subscribe(() => {
            this.isLandscape = this.screenOrientationService.type.includes('landscape');
        });
        this.error = ManifestManagerErrorFactory.CreateNoError();
    }

    private setPlatformIdentifiers(): void {
        this.isDesktop = this.platformService.is('desktop');
        this.isIpad = this.platformService.is('ipad');
        this.isTablet = this.platformService.is('tablet');
        this.isAndroid = this.platformService.is('android');
        this.isIos = this.platformService.is('ios');
        this.isMobile = this.platformService.is('mobile');
    }

    onResize(): void {
        this.deviceWidth = this.platformService.width();
        this.deviceHeight = this.platformService.height();
    }

    GetDateTime(date: string): string {
        if (date === '0001-01-01T00:00:00') {
            return '';
        } else {
            return date;
        }
    }

    displayError(error: IManifestManagerError): void {
        this.alertController.create({
            header: error.ErrorTitle,
            message: error.ErrorMessage,
            buttons: [{
                text: MessageConstants.OK
            }]
        }).then(alertElement => {
            alertElement.present();
        });
    }
}