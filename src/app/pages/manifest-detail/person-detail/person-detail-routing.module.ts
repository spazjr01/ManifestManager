import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonDetailPage } from './person-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PersonDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonDetailPageRoutingModule {}
