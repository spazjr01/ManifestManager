// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

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
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [ManifestDetailMainPage]
})

export class ManifestDetailMainPageModule {}
