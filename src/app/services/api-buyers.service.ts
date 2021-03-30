import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from "../app.settings";
import { Observable } from 'rxjs';
import { Buyer } from '../models/buyer';
import { Injectable } from '@angular/core';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ApiBuyersService {

  url: string = AppSettings.API_ENDPOINT + "buyers/";
  constructor(private _http: HttpClient) { }

  getBuyers(): Observable<Buyer>{
    return this._http.get<Buyer>(this.url);
  }

  addBuyer(buyer: Buyer): Observable<Buyer>{
    return this._http.post<Buyer>(this.url, buyer, httpOption);
  }
}
