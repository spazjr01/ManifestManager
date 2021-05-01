// Angular libraries
import { NgModule } from '@angular/core';

// Manifest Manager classes and components
import { AddPersonPageRoutingModule } from './add-person-routing.module';
import { AddPersonPage } from './add-person.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        AddPersonPageRoutingModule,
        SharedModule
    ],
    declarations: [AddPersonPage]
})

export class AddPersonPageModule {}
