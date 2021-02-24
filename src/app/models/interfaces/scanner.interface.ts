// Angular libraries
import { ElementRef } from '@angular/core';

// Other libraries
import { Subscription } from 'rxjs';

// Manifest Manager classes and components

export interface IScanner {

    // Subscriptions
    LightSubscription: Subscription;
    AutofocusSubscription: Subscription;
    StatusSubscription: Subscription;
    ResultSubscription: Subscription;

    // View/Scanner
    PreviewElement: ElementRef<HTMLVideoElement>;
    ScreenLoaded: boolean;
    UpdatingScanner: boolean;
    ScannerEnabled: boolean;
    DisplayFullVideoWidth: boolean;

    // Light
    LightCompatible: boolean;
    LightEnabled: boolean
    LightOn: boolean;

    // Autofocus
    AutofocusCompatible: boolean;
    AutofocusEnabled: boolean;
    AutofocusOn: boolean;

    // Help/Status Text
    InfoOn: boolean;
    Status: string;
}