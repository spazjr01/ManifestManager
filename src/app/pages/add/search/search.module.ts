// Angular libraries
import { NgModule } from '@angular/core';

// Manifest Manager classes and components
import { ManualPageRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        ManualPageRoutingModule,
        SharedModule
    ],
    declarations: [SearchPage]
})
export class SearchPageModule {}
