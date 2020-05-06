import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenComponent } from './authen.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'authen', component: AuthenComponent}
]

@NgModule({
  declarations: [AuthenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AuthenModule { }
