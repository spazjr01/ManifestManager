// Angular libraries
import { NgModule } from '@angular/core';

// Manifest Manager classes and components
import { CameraScanPageRoutingModule } from './camera-scan-routing.module';
import { CameraScanPage } from './camera-scan.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CameraScanPageRoutingModule,
        SharedModule
    ],
    declarations: [CameraScanPage]
})

export class CameraScanPageModule {}
