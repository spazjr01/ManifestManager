import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddJumpManifestPage } from './add-jump-manifest.page';

const routes: Routes = [
  {
    path: '',
    component: AddJumpManifestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddJumpManifestPage]
})
export class AddJumpManifestPageModule {}
