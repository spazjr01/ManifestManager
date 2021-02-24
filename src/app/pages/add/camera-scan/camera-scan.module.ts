// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

// Manifest Manager classes and components
import { CameraScanPageRoutingModule } from './camera-scan-routing.module';
import { CameraScanPage } from './camera-scan.page';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CameraScanPageRoutingModule,
        SharedModule
    ],
    declarations: [CameraScanPage]
})

export class CameraScanPageModule {}
