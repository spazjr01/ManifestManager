// Angular libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Manifest Manager classes and components
import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AuthPage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [AuthPage]
})
export class AuthPageModule {}
