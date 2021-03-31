import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Ticket } from 'src/app/models/ticket';
import { AppSettings } from "src/app/app.settings";
import { Subject } from 'rxjs';
import { ApiTicketsService } from 'src/app/services/api-tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  ticketsList: Ticket[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  ready: boolean = false;

  constructor(private apiTicketsService: ApiTicketsService) { }

  ngOnInit(): void {
    this.dtOptions = AppSettings.DATA_TABLES_OPTIONS;
    this.getTickets();
  }

  getTickets(){
    this.apiTicketsService.getTickets().subscribe(
      response => {
        this.ticketsList = response;
        this.dtTrigger.next();
        this.ready = true;
      },
      error => {

      }
    )
  }
}
