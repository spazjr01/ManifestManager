// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager classes and components
import { SharedModule } from '../../../shared/shared.module';
import { AddJumpManifestPage } from './add-jump-manifest.page';

const routes: Routes = [
    {
        path: '',
        component: AddJumpManifestPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AddJumpManifestPage]
})

export class AddJumpManifestPageModule {}
