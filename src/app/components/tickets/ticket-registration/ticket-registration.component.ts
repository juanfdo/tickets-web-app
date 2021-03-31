import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiTicketsService } from 'src/app/services/api-tickets.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'
import { faSave, faWindowClose} from '@fortawesome/free-solid-svg-icons';

import { Ticket } from "../../../models/ticket";

@Component({
  selector: 'app-ticket-registration',
  templateUrl: './ticket-registration.component.html',
  styleUrls: ['./ticket-registration.component.css']
})
export class TicketRegistrationComponent implements OnInit {
  faSave=faSave;
  faWindowClose=faWindowClose;

  ticket: Ticket = {
    id: null,
    tic_event_name: null,
    tic_quantity: null,
    tic_sold: null,
  };

  submitted = false;
  ticketForm: FormGroup;

  onSubmit() {
    
    this.submitted = true;
    if (this.ticketForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'Las Boletas no se pudieron guardar, por favor verifique los mensajes bajo los campos diligenciados para corregir la información.',
        footer: 'Agradecemos su comprensión.'
      });
      return;
    }

    Swal.fire({
      title: '¿Está seguro de que desea guardar los cambios?',
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiTicketsService.addTicket(this.ticket).subscribe(
          response => {
            debugger;
            Swal.fire('¡Felicidades!', 'Las boletas fueron guardadas satisfactoriamente.', 'success');
            this.ticketForm.reset();
            this.submitted = false;
            this.router.navigate(['tickets']);
          },

          error => {
            if(error.status == 422){
              if(error["error"]?.errors?.tic_event_name[0] === "The tic event name has already been taken."){
                this.ticketForm.controls.tic_event_name.setErrors({unique: true});
                Swal.fire({
                  icon: 'error',
                  title: 'Lo sentimos.',
                  text: 'No fue posible guardar las boletass en la base de datos, el nombre del evento ya existe en la base de datos.',
                  footer: 'Agradecemos su comprensión.'
                });
                return;
              }
            }

            Swal.fire({
              icon: 'error',
              title: 'Lo sentimos.',
              text: 'No fue posible guardar las boletass en la base de datos, por favor verifique la información ingresada.',
              footer: 'Agradecemos su comprensión.'
            });
          }
        )

      }
    })
  }

  onCancel(){
    this.location.back();
  }

  constructor(
    private location: Location,
    private apiTicketsService: ApiTicketsService,
    private formBuilder: FormBuilder,
    private router: Router
    ){}

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      'tic_quantity': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'tic_event_name': ['', Validators.required]
    });
  }

  get f() { return this.ticketForm.controls; }

}
