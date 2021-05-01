// Angular libraries
import { NgModule } from '@angular/core';

// Manifest Manager classes and components
import { ManualPageRoutingModule } from './manual-routing.module';
import { ManualPage } from './manual.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        ManualPageRoutingModule,
        SharedModule
    ],
    declarations: [ManualPage]
})
export class ManualPageModule {}
