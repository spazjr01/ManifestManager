// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager libraries
import { ManifestDetailMainPage } from './manifest-detail-main.page';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: ManifestDetailMainPage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ManifestDetailMainPage]
})

export class ManifestDetailMainPageModule {}
