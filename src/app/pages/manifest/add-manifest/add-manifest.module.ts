// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest classes and components
import { AddManifestPage } from './add-manifest.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AddManifestPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AddManifestPage]
})

export class AddManifestPageModule {}
