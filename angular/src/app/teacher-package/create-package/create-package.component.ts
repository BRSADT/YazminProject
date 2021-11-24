import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PaquetesService } from '../../paquetes/paquetes.service';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {

  valeForm!: FormGroup;
  chkMatForm!: FormGroup;
  btnSend: boolean = false
  dataWarehouse: any
  dataSubjects: any
  dataLabs: any;
  items: any = [];

  constructor(private fb: FormBuilder, private pqtSrv: PaquetesService, private cookieSrv: CookieService, private toastr: ToastrService) {
    this.createValeForm();
  }

  ngOnInit(): void {
    this.autoFillTeacher();
    this.obtainWarehouse();
    this.valeForm.get('squad')?.disable();
    this.valeForm.get('career')?.disable();
    this.valeForm.get('nameStudent')?.disable();
    this.valeForm.get('register')?.disable();
    this.valeForm.get('group')?.disable();
  }

  createValeForm() {
    this.valeForm = this.fb.group({
      squad: ['Colomos', Validators.required],
      date: ['', Validators.required],
      career: ['', Validators.required],
      laboratory: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      subject: ['', Validators.required],
    });
  }

  autoFillTeacher() {
    let id_user = this.cookieSrv.get('resu');
    this.pqtSrv.autoFillTeacher(id_user).subscribe(
      (response: any) => {
        // console.log(response.data);
        if (response.status === 'OK') {
          let division = response.data.carrera;
          this.obtainLabs(division);
          this.obtainSubjects(division);
          this.valeForm.get('career')?.setValue(division);
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  /*
  @return
  response.status: string
  response.data:   object
  */
  obtainWarehouse() {
    this.pqtSrv.obtainWarehouse().subscribe(
      (response: any) => {
        // console.log({ response });
        if (response.status === 'OK') {
          this.dataWarehouse = response.data;
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }


  obtainSubjects(divisionStr: string) {
    let division: number;

    (divisionStr == 'Desarrollo de Software') ? division = 1 : division = 0;

    this.pqtSrv.obtainSubjects(division).subscribe(
      (response: any) => {
        // console.log(response.data);
        if (response.status === 'OK') {
          this.dataSubjects = response.data;
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }


  obtainLabs(divisionStr: string) {
    let division: number;

    (divisionStr == 'Desarrollo de Software') ? division = 1 : division = 0;

    this.pqtSrv.obtainLabs(division).subscribe(
      (response: any) => {
        // console.log(response.data);
        if (response.status === 'OK') {
          this.dataLabs = response.data;
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }


  itemSelected(index: number, idMat: number, nombre: string, no_inv: number) {
    if (this.items.push({ index, idMat, nombre, no_inv })) {
      this.dataWarehouse.splice(index, 1);
    }
    if (this.items.length > 0) {
      this.btnSend = true;
    }
  }

  saveVale() {
    if (this.valeForm.valid) {
      let plantel = this.valeForm.get('squad')?.value;
      let fecha = this.valeForm.get('date')?.value;
      let carrera = this.valeForm.get('career')?.value;
      (carrera == 'Desarrollo de Software') ? carrera = 1 : carrera = 0;
      let laboratorio = this.valeForm.get('laboratory')?.value;
      let hora_entrada = this.valeForm.get('hora_entrada')?.value
      let hora_salida = this.valeForm.get('hora_salida')?.value
      let subject = this.valeForm.get('subject')?.value;

      let json = {
        'campus': plantel,
        'date': fecha,
        'career': parseInt(carrera),
        'laboratory': parseInt(laboratorio),
        'hr_in': hora_entrada,
        'hr_out': hora_salida,
        'subject': parseInt(subject),
        'teacher': parseInt(this.cookieSrv.get('resu')),
        'valeType': 3,
        'signature': 1,
        'state': 0
      }

      this.pqtSrv.valeUser(json, this.items).subscribe(
        (response: any) => {
          if (response.status == 'OK') {
            this.items = [];
            this.obtainWarehouse();
            this.valeForm.reset();
            this.btnSend = false;
            this.toastr.success(response.msg, response.status);
          } else {
            this.toastr.error(response.msg, response.status);
          }
        },
        (error: any) => {
          console.log({ error });
        }
      )
    }
  }

  /*
  @params
  index: number
  */
  removeElement(index: number) {
    this.dataWarehouse.push({
      id_almacen: this.items[index].idMat,
      nombre: this.items[index].nombre,
      no_inventario: this.items[index].no_inv,
      estado: '1'
    });

    this.items.splice(index, 1);

    if (this.items.length == 0) {
      this.btnSend = false;
    }
  }

}
