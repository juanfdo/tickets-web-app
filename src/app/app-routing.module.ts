import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './components/tickets/tickets.component';
import { BuyersComponent } from './components/buyers/buyers.component';
import { BuyerRegistrationComponent } from "./components/buyers/buyer-registration/buyer-registration.component";
import { TicketRegistrationComponent } from "./components/tickets/ticket-registration/ticket-registration.component";
import { TicketSellingComponent } from "./components/tickets/ticket-selling/ticket-selling.component";

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tickets', component: TicketsComponent, pathMatch: 'full'},
  { path: 'buyers', component: BuyersComponent, pathMatch: 'full'},
  { path: 'tickets/registration', component: TicketRegistrationComponent },
  { path: 'buyers/registration', component: BuyerRegistrationComponent },
  { path: 'tickets/:id/selling', component: TicketSellingComponent },

//  { path: 'ficha/:casoId', component: FichaComponent, canActivate: [AuthGuard], data: {roles: [1,2,3,4]} },
//  { path: 'derivacion/:fichaId', component: DerivacionComponent, canActivate: [AuthGuard], data: {roles: [2,3,4]} },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }