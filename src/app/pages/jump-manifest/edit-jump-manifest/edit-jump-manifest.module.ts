// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager classes and components
import { SharedModule } from '../../../shared/shared.module';
import { EditJumpManifestPage } from './edit-jump-manifest.page';

const routes: Routes = [
    {
        path: '',
        component: EditJumpManifestPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
  declarations: [EditJumpManifestPage]
})

export class EditJumpManifestPageModule {}
