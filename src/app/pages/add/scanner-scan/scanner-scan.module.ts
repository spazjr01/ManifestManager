// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

// Manifest Manager classes and components
import { ScannerScanPageRoutingModule } from './scanner-scan-routing.module';
import { ScannerScanPage } from './scanner-scan.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ScannerScanPageRoutingModule,
        SharedModule
    ],
    declarations: [ScannerScanPage]
})
export class ScannerScanPageModule {}
