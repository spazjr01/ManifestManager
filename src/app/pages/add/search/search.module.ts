// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic libraires
import { IonicModule } from '@ionic/angular';

// Manifest Manager classes and components
import { ManualPageRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ManualPageRoutingModule,
        SharedModule
    ],
    declarations: [SearchPage]
})
export class SearchPageModule {}
