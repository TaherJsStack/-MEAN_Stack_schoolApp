import { AddBookComponent } from './back-end/pages/library/add-book/add-book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './providers/auth.guard';
import { Page500Component } from './back-end/users/page500/page500.component';

const routes: Routes = [
    { path: '', 
      loadChildren: () => 
      import('./front-end/frontend.module').then(m => m.FrontendModule) },

    { path: 'backend', 
      loadChildren: () => 
      import('./back-end/backend.module').then(m => m.BackendModule) },

  { path: '**', component: Page500Component }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
