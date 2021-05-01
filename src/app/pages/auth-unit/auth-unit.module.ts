// Angular libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Manifest Manager classes and components
import { AuthUnitPage } from './auth-unit.page';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '', component: AuthUnitPage
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedModule
        ],
        declarations: [AuthUnitPage]
})

export class AuthUnitPageModule {}
