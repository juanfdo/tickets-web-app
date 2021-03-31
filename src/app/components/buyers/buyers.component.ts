import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Buyer } from 'src/app/models/buyer';
import { AppSettings } from "src/app/app.settings";
import { Subject } from 'rxjs';
import { ApiBuyersService } from 'src/app/services/api-buyers.service';
import Swal from 'sweetalert2';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {
  faPlus=faPlus;
  dtOptions: DataTables.Settings = {};
  buyersList: Buyer[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  ready: boolean = false;

  constructor(private apiBuyersService: ApiBuyersService) { }

  ngOnInit(): void {
    this.dtOptions = AppSettings.DATA_TABLES_OPTIONS;
    this.getBuyers();
  }

  getBuyers(){
    this.apiBuyersService.getBuyers().subscribe(
      response => {
        this.buyersList = response;
        this.dtTrigger.next();
        this.ready = true;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos.',
          text: 'No fue posible obtener la lista de compradores, intentelo más tarde.',
          footer: 'Agradecemos su comprensión.'
        });
      }
    )
  }
}
