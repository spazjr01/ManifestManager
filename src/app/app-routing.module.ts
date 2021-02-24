// Angular libraries
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Manifest Manager classes and components
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'auth-unit', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule) },
    {
        path: 'auth-unit',
        loadChildren: () => import('./pages/auth-unit/auth-unit.module').then(m => m.AuthUnitPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'manifest',
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/manifest/manifest-main/manifest-main.module').then(m => m.ManifestMainPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'add',
                loadChildren: () => import('./pages/manifest/add-manifest/add-manifest.module').then(m => m.AddManifestPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'edit',
                loadChildren: () => import('./pages/manifest/edit-manifest/edit-manifest.module').then(m => m.EditManifestPageModule),
                canLoad: [AuthGuard]
            }
        ],
        canLoad: [AuthGuard]
    },
    {
        path: 'manifest-details',
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/manifest-detail/manifest-detail-main/manifest-detail-main.module').then(m => m.ManifestDetailMainPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'add',
                loadChildren: () => import('./pages/manifest-detail/add-person/add-person.module').then(m => m.AddPersonPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'view-person',
                loadChildren: () => import('./pages/manifest-detail/person-detail/person-detail.module').then(m => m.PersonDetailPageModule),
                canLoad: [AuthGuard]
            }
        ],
        canLoad: [AuthGuard]
    },
    {
        path: 'jump-manifest', children: [
            {
                path: '',
                loadChildren: () => import('./pages/jump-manifest/jump-manifest-main/jump-manifest-main.module').then(m => m.JumpManifestMainPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'add',
                loadChildren: () => import('./pages/jump-manifest/add-jump-manifest/add-jump-manifest.module').then(m => m.AddJumpManifestPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'edit/:manifestId',
                loadChildren: () => import('./pages/jump-manifest/edit-jump-manifest/edit-jump-manifest.module').then(m => m.EditJumpManifestPageModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'details',
                loadChildren: () => import('./pages/jump-manifest/jump-manifest-detail/jump-manifest-detail.module').then(m => m.JumpManifestDetailPageModule),
                canLoad: [AuthGuard]
            }
        ],
        canLoad: [AuthGuard]
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
        canLoad: [AuthGuard]
    }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
