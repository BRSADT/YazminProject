import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PaquetesService } from '../paquetes/paquetes.service';

@Component({
  selector: 'app-create-vale-priori',
  templateUrl: './create-vale-priori.component.html',
  styleUrls: ['./create-vale-priori.component.css']
})
export class CreateValePrioriComponent implements OnInit {
  valeForm!: FormGroup;
  chkMatForm!: FormGroup;
  btnSend: boolean = false

  dataAutoFillVale: any;
  dataWarehouse: any
  dataTeachers: any
  dataLabs: any;
  items: any = [];
  actualDate: any;
  actualHour: any;

  constructor(private fb: FormBuilder, private pqtSrv: PaquetesService, private cookieSrv: CookieService, private toastr: ToastrService) {
    this.createValeForm();
  }

  ngOnInit(): void {
    const date = new Date();
    this.actualDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() ;
    this.actualHour = date.getHours() + ':' + date.getMinutes();
    this.autoFillStudent();
    this.obtainWarehouse();
    this.obtainTeachers();
    this.valeForm.get('date')?.disable();
    this.valeForm.get('hora_salida')?.disable();
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
      nameStudent: [{ disable: true }, Validators.required],
      register: ['', Validators.required],
      group: ['', Validators.required],
      hora_entrada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      nameTeacher: ['', Validators.required],
    });
  }

  autoFillStudent() {
    let id_user = this.cookieSrv.get('resu');

    /*
    @params
    id_user: number (cookie)
    @return
    response.status: string
    response.data:   object
    */
    this.pqtSrv.autoFillStudent(id_user).subscribe(
      (response: any) => {
        // console.log(response.data);
        if (response.status === 'OK') {
          let division = response.data.carrera;
          this.obtainLabs(division);
          this.dataAutoFillVale = response;
          this.valeForm.get('date')?.setValue(this.actualDate);
          this.valeForm.get('hora_salida')?.setValue(this.actualHour);
          this.valeForm.get('career')?.setValue(division);
          this.valeForm.get('nameStudent')?.setValue(response.data.nombreEstudiante);
          this.valeForm.get('register')?.setValue(response.data.id_registro);
          this.valeForm.get('group')?.setValue(response.data.grupo);
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
        console.log({ response });
        if (response.status === 'OK') {
          this.dataWarehouse = response.data;
          this.dataWarehouse = this.dataWarehouse.filter((item: { tipo: number; }) => item.tipo == 2);
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  obtainTeachers() {
    /*
    @return
    response.status: string
    response.data:   object
    */
    this.pqtSrv.obtainTeachers().subscribe(
      (response: any) => {
        // console.log(response.data);
        if (response.status === 'OK') {
          this.dataTeachers = response.data;
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
      let carrera = this.valeForm.get('career')?.value;
      let laboratorio = this.valeForm.get('laboratory')?.value;
      let nombre = this.valeForm.get('nameStudent')?.value;
      let group = this.valeForm.get('group')?.value;
      let usuario = this.dataAutoFillVale.data.id_usuario;
      let hora_entrada = this.valeForm.get('hora_entrada')?.value
      let id_nomina = this.valeForm.get('nameTeacher')?.value;

      //console.log(plantel, fecha, carrera, laboratorio.toUpperCase(), nombre, group, usuario, hora_salida, hora_entrada, id_nomina);

      let json = {
        'campus': plantel,
        'date': this.actualDate,
        'career': carrera,
        'laboratory': laboratorio,
        'name': nombre,
        'group': group,
        'user': usuario,
        'hr_in': hora_entrada,
        'hr_out': this.actualHour,
        'teacher': id_nomina,
        'valeType': 2, /*Real type = 1*/
        'signature': 0,
        'state': 0
      }

      //console.log(json);

      this.pqtSrv.valeUser(json, this.items).subscribe(
        //console.log(json, this.items),
        (response: any) => {
          console.log(response);

          if (response.status == 'OK') {
            this.toastr.success(response.msg, response.status);
            this.items = []
            this.autoFillStudent();
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
