// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager classes and components
import { SharedModule } from '../../../shared/shared.module';
import { JumpManifestDetailPage } from './jump-manifest-detail.page';

const routes: Routes = [
    {
        path: '',
        component: JumpManifestDetailPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [JumpManifestDetailPage]
})

export class JumpManifestDetailPageModule {}
