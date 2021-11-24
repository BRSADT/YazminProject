import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PaquetesService } from '../paquetes/paquetes.service';

@Component({
  selector: 'app-create-vale-teacher',
  templateUrl: './create-vale-teacher.component.html',
  styleUrls: ['./create-vale-teacher.component.css']
})
export class CreateValeTeacherComponent implements OnInit {
  valeForm!: FormGroup;
  chkMatForm!: FormGroup;
  btnSend: boolean = false

  dataAutoFillVale: any;
  dataWarehouse: any
  dataLabs: any;
  items: any = [];
  teacherName!: string;

  constructor(private fb: FormBuilder, private pqtSrv: PaquetesService, private cookieSrv: CookieService, private toastr: ToastrService) {
    this.createValeForm();
  }

  ngOnInit(): void {
    this.autoFillTeacher();
    this.obtainWarehouse();
    this.valeForm.get('squad')?.disable();
    this.valeForm.get('career')?.disable();
    this.valeForm.get('nameTeacher')?.disable();
    this.valeForm.get('register')?.disable();
    this.valeForm.get('group')?.disable();
  }

  createValeForm() {
    this.valeForm = this.fb.group({
      squad: ['Colomos', Validators.required],
      date: ['', Validators.required],
      career: ['', Validators.required],
      laboratory: ['', Validators.required],
      nameStudent: [{ disable: true }, Validators.required],
      register: ['', Validators.required],
      group: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      nameTeacher: ['', Validators.required],
    });
  }

  autoFillTeacher() {
    let id_user = this.cookieSrv.get('resu');

    /*
    @params
    register: number (cookie)
    @return
    response.status: string
    response.data:   object
    */
    this.pqtSrv.autoFillTeacher(id_user).subscribe(
      (response: any) => {
        // console.log(response.data);
        if (response.status === 'OK') {
          let division = response.data.carrera;
          this.obtainLabs(division);
          this.dataAutoFillVale = response;
          this.valeForm.get('career')?.setValue(division);
          this.valeForm.get('nameTeacher')?.setValue(response.data.nombreDocente);
          this.valeForm.get('register')?.setValue(response.data.id_nomina);
          this.valeForm.get('group')?.setValue('XX');
          this.teacherName = this.dataAutoFillVale.data.nombreDocente;
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  obtainWarehouse() {
    /*
    @return
    response.status: string
    response.data:   object
    */
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

  obtainLabs(divisionStr: string) {
    let division: number;

    (divisionStr == 'Desarrollo de Software') ? division = 1 : division = 0;

    /*
    @params
    division: number
    @return
    response.status: string
    response.data:   object
    */
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

  /*
  @params
  index:  number
  idMat:  number
  nombre: string
  no_inv: number
  @return
  this.dataWarehouse: object
  */
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
      let laboratorio = this.valeForm.get('laboratory')?.value;
      let nombre = this.valeForm.get('nameTeacher')?.value;
      let group = this.valeForm.get('group')?.value;
      let usuario = parseInt(this.dataAutoFillVale.data.id_usuario);
      let hora_entrada = this.valeForm.get('hora_entrada')?.value
      let hora_salida = this.valeForm.get('hora_salida')?.value

      //console.log(plantel, fecha, carrera, laboratorio.toUpperCase(), nombre, group, usuario, hora_salida, hora_entrada, id_nomina);

      let json = {
        'campus': plantel,
        'date': fecha,
        'career': carrera,
        'laboratory': laboratorio,
        'name': nombre,
        'group': group,
        'user': usuario,
        'hr_in': hora_entrada,
        'hr_out': hora_salida,
        'teacher': usuario,
        'valeType': 4, /*Real type = 3*/
        'signature': 1,
        'state': 0
      }

      // console.log(json);

      this.pqtSrv.valeUser(json, this.items).subscribe(
        //console.log(json, this.items),
        (response: any) => {
          // console.log(response);
          if (response.status == 'OK') {
            this.toastr.success(response.msg, response.status);
            this.items = []
            this.autoFillTeacher();
            this.obtainWarehouse();
            this.valeForm.reset();
            this.btnSend = false;
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
  index:  number
  @return
  this.dataWarehouse: object
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
