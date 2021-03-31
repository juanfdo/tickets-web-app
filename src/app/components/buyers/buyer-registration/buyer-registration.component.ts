import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiBuyersService } from 'src/app/services/api-buyers.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'

import { Buyer } from "../../../models/buyer";

@Component({
  selector: 'app-buyer-registration',
  templateUrl: './buyer-registration.component.html',
  styleUrls: ['./buyer-registration.component.css']
})

export class BuyerRegistrationComponent implements OnInit {

  buyer: Buyer = {
    id: null,
    buy_id_number: null,
    buy_first_name: null,
    buy_last_name: null
  };
  submitted = false;
  buyerForm: FormGroup;

  onSubmit() {
    
    this.submitted = true;
    if (this.buyerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos.',
        text: 'El comprador no se pudo guardar, por favor verifique los mensajes bajo los campos diligenciados para corregir la información.',
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
        this.apiBuyersService.addBuyer(this.buyer).subscribe(
          response => {
            debugger;
            Swal.fire('¡Felicidades!', 'El comprador fue guardado satisfactoriamente.', 'success');
            this.buyerForm.reset();
            this.submitted = false;
            this.router.navigate(['buyers']);
          },

          error => {
            if(error.status == 422){
              if(error["error"]?.errors?.buy_id_number[0] === "The buy id number has already been taken."){
                this.buyerForm.controls.buy_id_number.setErrors({unique: true});
                Swal.fire({
                  icon: 'error',
                  title: 'Lo sentimos.',
                  text: 'El comprador no se pudo guardar, el número de identificación ya existe en la base de datos.',
                  footer: 'Agradecemos su comprensión.'
                });
                return;
              }
            }

            Swal.fire({
              icon: 'error',
              title: 'Lo sentimos.',
              text: 'El comprador no se pudo guardar en la base de datos, por favor verifique la información ingresada.',
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
    private apiBuyersService: ApiBuyersService,
    private formBuilder: FormBuilder,
    private router: Router
    ){}

  ngOnInit(): void {
    this.buyerForm = this.formBuilder.group({
      'buy_first_name': ['', Validators.required],
      'buy_last_name': ['', Validators.required],
      'buy_id_number': ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  get f() { return this.buyerForm.controls; }

}
