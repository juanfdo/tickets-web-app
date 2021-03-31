import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';

import { BuyersComponent } from './components/buyers/buyers.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { MenuComponent } from './components/menu/menu.component';
import { BuyerRegistrationComponent } from './components/buyers/buyer-registration/buyer-registration.component';
import { TicketRegistrationComponent } from './components/tickets/ticket-registration/ticket-registration.component';
import { TicketSellingComponent } from './components/tickets/ticket-selling/ticket-selling.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    BuyersComponent,
    TicketsComponent,
    MenuComponent,
    BuyerRegistrationComponent,
    TicketRegistrationComponent,
    TicketSellingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule,
    NgSelect2Module,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
