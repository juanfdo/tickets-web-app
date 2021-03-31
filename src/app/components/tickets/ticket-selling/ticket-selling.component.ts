import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiTicketsService } from 'src/app/services/api-tickets.service';
import Swal from 'sweetalert2';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

import { TicketXBuyer } from "../../../models/ticket-x-uyer";
import { Ticket } from 'src/app/models/ticket';
import { Buyer } from 'src/app/models/buyer';
import { ApiBuyersService } from 'src/app/services/api-buyers.service';
import { AvailableTickets } from 'src/app/models/available-tickets';

@Component({
  selector: 'app-ticket-selling',
  templateUrl: './ticket-selling.component.html',
  styleUrls: ['./ticket-selling.component.css']
})
export class TicketSellingComponent implements OnInit {
  public options: Options;
  public select2Data: Array<Select2OptionData>;

  submitted = false;
  ticketXBuyerForm: FormGroup;

  ticketXBuyer: TicketXBuyer = {
    id: null,
    txb_buyer_id: null,
    txb_quantity: null,
    txb_ticket_id: null,
  };

  ticket: Ticket = {
    id: null,
    tic_event_name: null,
    tic_quantity: null,
    tic_sold: null,
  }

  availableTickets: AvailableTickets = {
    id: null,
    available_quantity: null,
  }

  buyersList: Buyer[] = null;

  onSubmit() {
    
    this.submitted = true;
    if (this.ticketXBuyerForm.invalid || this.qtyNotAvailable)
    {
      if( this.qtyNotAvailable ){
        this.ticketXBuyerForm.controls.txb_quantity.setErrors({not_available: true});
      }
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Las Boletas no se pudieron asignar, por favor verifique los mensajes bajo los campos diligenciados para corregir la información.',
        footer: 'Agradecemos su comprensión.'
      });
      return;
    }

    Swal.fire({
      title: '¿Está seguro de que desea guardar?',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketXBuyer = {
          id: null,
          txb_buyer_id: <BigInt> (<any>parseInt(this.ticketXBuyer.txb_buyer_id.toString()) ),
          txb_quantity: <BigInt> (<any>parseInt(this.ticketXBuyer.txb_quantity.toString()) ),
          txb_ticket_id: <BigInt> (<any>parseInt(this.ticketXBuyer.txb_ticket_id.toString()) ),
        }
        this.apiTicketsService.sellTicket(this.ticketXBuyer).subscribe(
          response => {
            Swal.fire('¡Felicidades!', 'Las boletas fueron asignadas satisfactoriamente.', 'success');
            this.ticketXBuyerForm.reset();
            this.submitted = false;
            this.router.navigate(['tickets']);
          },

          error => {
            if(error.status == 422){
              debugger;
              if(error["error"]?.errors?.txb_quantity[0]?.startsWith("The txb quantity may not be greater ")){
                this.ticketXBuyerForm.controls.txb_quantity.setErrors({not_available: true});
                Swal.fire({
                  icon: 'error',
                  title: 'Lo sentimos.',
                  text: 'No fue posible asignar las boletas, la cantidad solicitada es mayor a la disponible actualmente.',
                  footer: 'Agradecemos su comprensión.'
                });
                this.getAvailabeQty();
                return;
              }
            }

            Swal.fire({
              icon: 'error',
              title: 'Lo sentimos.',
              text: 'No fue posible guardar la compra, por favor verifique la información ingresada.',
              footer: 'Agradecemos su comprensión.'
            });
          }
        )

      }
    })
  }

  cancel() {}

  constructor(
    private apiBuyersService: ApiBuyersService,
    private apiTicketsService: ApiTicketsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.getTicketWithRouteParam();
    this.getBuyers();
    this.buildForm();    
  }

  setupSelect2Options(){
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: '100',height: '300',
    };
  }

  buildForm(){
    this.ticketXBuyerForm = this.formBuilder.group({
      'txb_buyer_id': ['', Validators.required],
      'txb_quantity': ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$")]],
    });
  }

  getTicketWithRouteParam(){
    this.ticketXBuyer.txb_ticket_id = this.route.snapshot.params.id;
    this.getTicket();
    this.getAvailabeQty();
  }

  getTicket(id: BigInt = this.ticketXBuyer.txb_ticket_id){
    this.apiTicketsService
      .getTicket(id)
      .subscribe(
        response => {
          this.ticket = response;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos.',
            text: 'No fue posible obtener la información correspondiente a la boleta, por favor intente nuevamente.',
            footer: 'Agradecemos su comprensión.'
          });
        });
  }

  getAvailabeQty(id: BigInt = this.ticketXBuyer.txb_ticket_id){
    this.apiTicketsService
      .getAvailable(id)
      .subscribe(
        response => {
          this.availableTickets = response;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos.',
            text: 'No fue posible obtener la información correspondiente a la cantidad disponible, por favor intente nuevamente.',
            footer: 'Agradecemos su comprensión.'
          });
        });
  }

  getBuyers(){
    this.apiBuyersService
      .getBuyers()
      .subscribe(
        response => {
          this.buyersList = response;
          this.mapBuyers();
        }
      )
  }

  mapBuyers(){
    this.select2Data = this.buyersList
      .map<Select2OptionData>(
        (e)=>({
          id: e.id.toString(),
          text: (e.buy_first_name + ' ' + e.buy_last_name)}));
  }

  get f() { return this.ticketXBuyerForm.controls; }

  get qtyNotAvailable(){
    return this.ticketXBuyer.txb_quantity >
      this.availableTickets.available_quantity;
  }

}
