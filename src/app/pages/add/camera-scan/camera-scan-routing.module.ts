import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraScanPage } from './camera-scan.page';

const routes: Routes = [
  {
    path: '',
    component: CameraScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraScanPageRoutingModule {}
