// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager classes and components
import { SharedModule } from '../../../shared/shared.module';
import { JumpManifestMainPage } from './jump-manifest-main.page';

const routes: Routes = [
    {
        path: '',
        component: JumpManifestMainPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [JumpManifestMainPage]
})
export class JumpManifestMainPageModule {}
