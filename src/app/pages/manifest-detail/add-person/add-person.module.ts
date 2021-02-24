// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

// Manifest Manager classes and components
import { AddPersonPageRoutingModule } from './add-person-routing.module';
import { AddPersonPage } from './add-person.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddPersonPageRoutingModule,
        SharedModule
    ],
    declarations: [AddPersonPage]
})

export class AddPersonPageModule {}
