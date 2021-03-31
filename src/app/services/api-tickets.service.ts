import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from "../app.settings";
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { Injectable } from '@angular/core';
import { TicketXBuyer } from '../models/ticket-x-uyer';
import { AvailableTickets } from '../models/available-tickets';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiTicketsService {

  url: string = AppSettings.API_ENDPOINT + "tickets/";
  constructor(private _http: HttpClient) { }

  getTickets(): Observable<Ticket[]>{
    return this._http.get<Ticket[]>(this.url);
  }

  addTicket(ticket: Ticket): Observable<Ticket>{
    return this._http.post<Ticket>(this.url, ticket, httpOption);
  }

  getTicket(id: BigInt): Observable<Ticket>{
    return this._http
      .get<Ticket>(
        this.url + id,
        httpOption);
  }

  sellTicket(ticketXBuyer: TicketXBuyer): Observable<TicketXBuyer>{
    return this._http
      .post<TicketXBuyer>(
        this.url + ticketXBuyer.txb_ticket_id + '/sells',
        ticketXBuyer,
        httpOption);
  }

  getAvailable(id: BigInt): Observable<AvailableTickets>{
    return this._http
      .get<AvailableTickets>(
        this.url + id + '/available',
        httpOption);
  }
}
