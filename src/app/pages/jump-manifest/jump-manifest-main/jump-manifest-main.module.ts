import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JumpManifestMainPage } from './jump-manifest-main.page';

const routes: Routes = [
  {
    path: '',
    component: JumpManifestMainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JumpManifestMainPage]
})
export class JumpManifestMainPageModule {}
