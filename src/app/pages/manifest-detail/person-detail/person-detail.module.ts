// Angular libraries
import { NgModule } from '@angular/core';

// Manifest Manager classes and components
import { PersonDetailPageRoutingModule } from './person-detail-routing.module';
import { PersonDetailPage } from './person-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        PersonDetailPageRoutingModule,
        SharedModule
    ],
    declarations: [PersonDetailPage]
})
export class PersonDetailPageModule {}
