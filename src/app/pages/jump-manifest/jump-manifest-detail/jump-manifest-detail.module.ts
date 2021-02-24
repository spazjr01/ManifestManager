import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JumpManifestDetailPage } from './jump-manifest-detail.page';

const routes: Routes = [
  {
    path: '',
    component: JumpManifestDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JumpManifestDetailPage]
})
export class JumpManifestDetailPageModule {}
