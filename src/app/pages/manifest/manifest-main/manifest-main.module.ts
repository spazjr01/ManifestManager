// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

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
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ManifestMainPage]
})
export class ManifestMainPageModule {}
