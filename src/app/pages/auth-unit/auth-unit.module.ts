// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

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
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
        ],
        declarations: [AuthUnitPage]
})

export class AuthUnitPageModule {}
