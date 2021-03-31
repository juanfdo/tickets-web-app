import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from "../app.settings";
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { Injectable } from '@angular/core';

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

  getTickets(): Observable<Ticket>{
    return this._http.get<Ticket>(this.url);
  }

  addTicket(ticket: Ticket): Observable<Ticket>{
    return this._http.post<Ticket>(this.url, ticket, httpOption);
  }
}
