import { EditPanelComponent } from './pages/edit-panel/edit-panel.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin-panel', pathMatch: 'full' },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'editpanel/:id', component: EditPanelComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
