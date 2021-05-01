// Angular libraries
import { NgModule } from '@angular/core';

// Manifest Manager classes and components
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SettingsPageRoutingModule,
        SharedModule
    ],
    declarations: [SettingsPage]
})
export class SettingsPageModule {}
