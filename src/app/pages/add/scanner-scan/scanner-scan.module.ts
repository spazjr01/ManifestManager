// Angular libraries
import { NgModule } from '@angular/core';

// Manifest Manager classes and components
import { ScannerScanPageRoutingModule } from './scanner-scan-routing.module';
import { ScannerScanPage } from './scanner-scan.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        ScannerScanPageRoutingModule,
        SharedModule
    ],
    declarations: [ScannerScanPage]
})
export class ScannerScanPageModule {}
