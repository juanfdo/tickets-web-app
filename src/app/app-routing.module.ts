import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets.component';
import { BuyersComponent } from './components/buyers/buyers.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tickets', component: TicketsComponent, pathMatch: 'full'},
  { path: 'buyers', component: BuyersComponent, pathMatch: 'full'},
  { path: 'tickets/:id', component: TicketsComponent },
  { path: 'buyers/:id', component: BuyersComponent },

//  { path: 'ficha/:casoId', component: FichaComponent, canActivate: [AuthGuard], data: {roles: [1,2,3,4]} },
//  { path: 'derivacion/:fichaId', component: DerivacionComponent, canActivate: [AuthGuard], data: {roles: [2,3,4]} },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }