// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

// Manifest Manager classes and components
import { PersonDetailPageRoutingModule } from './person-detail-routing.module';
import { PersonDetailPage } from './person-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PersonDetailPageRoutingModule,
        SharedModule
    ],
    declarations: [PersonDetailPage]
})
export class PersonDetailPageModule {}
