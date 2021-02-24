import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerScanPage } from './scanner-scan.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerScanPageRoutingModule {}
