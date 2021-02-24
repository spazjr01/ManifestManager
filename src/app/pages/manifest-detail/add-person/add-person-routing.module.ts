// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager classes and components
import { AddPersonPage } from './add-person.page';
import { AuthGuard } from '../../../services/auth.guard';

const routes: Routes = [
    {
        path: 'tabs',
        component: AddPersonPage,
        children: [
            {
                path: 'camera-scan',
                loadChildren: () => import('../../add/camera-scan/camera-scan.module').then(m => m.CameraScanPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'scanner-scan',
                loadChildren: () => import('../../add/scanner-scan/scanner-scan.module').then(m => m.ScannerScanPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'search',
                loadChildren: () => import('../../add/search/search.module').then(m => m.SearchPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'manual',
                loadChildren: () => import('../../add/search/search.module').then(m => m.SearchPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: '',
                redirectTo: '/auth-unit',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/auth-unit',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddPersonPageRoutingModule {}
