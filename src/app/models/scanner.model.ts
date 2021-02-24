// Angular libraries
import { ElementRef } from '@angular/core';

// Other libraries
import { Subscription } from 'rxjs';

// Manifest Manager classes and components
import { IScanner } from './interfaces/scanner.interface';

export class Scanner implements IScanner {

    LightSubscription: Subscription;
    AutofocusSubscription: Subscription;
    StatusSubscription: Subscription;
    ResultSubscription: Subscription;
    PreviewElement: ElementRef<HTMLVideoElement>;
    ScreenLoaded: boolean;
    UpdatingScanner: boolean;
    ScannerEnabled: boolean;
    DisplayFullVideoWidth: boolean;
    LightCompatible: boolean;
    LightEnabled: boolean
    LightOn: boolean;
    AutofocusCompatible: boolean;
    AutofocusEnabled: boolean;
    AutofocusOn: boolean;
    InfoOn: boolean;
    Status: string;

    constructor( ) {
        this.LightSubscription = new Subscription();;
        this.AutofocusSubscription = new Subscription();
        this.StatusSubscription = new Subscription();
        this.ResultSubscription = new Subscription();
        this.PreviewElement = null;
        this.ScreenLoaded = false;
        this.UpdatingScanner = false;
        this.ScannerEnabled = false;
        this.DisplayFullVideoWidth = false;
        this.LightCompatible = false;
        this.LightEnabled = false;
        this.LightOn = false;
        this.AutofocusCompatible = false;
        this.AutofocusEnabled = false
        this.AutofocusOn = false;
        this.InfoOn = false;
        this.Status = '';
    }
}