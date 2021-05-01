// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager classes and libraries
import { ManifestMainPage } from './manifest-main.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: ManifestMainPage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ManifestMainPage]
})
export class ManifestMainPageModule {}
