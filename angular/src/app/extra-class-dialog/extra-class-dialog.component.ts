import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../extra-class-dashboard/extra-class-dashboard.component';
import { PaquetesService } from '../paquetes/paquetes.service';

@Component({
  templateUrl: './extra-class-dialog.component.html',
  styleUrls: ['./extra-class-dialog.component.css']
})
export class ExtraClassDialogComponent implements OnInit {
  dataTeachers: any;
  overForm: any;
  dataLabs: any;
  dataSubjects: any;
  dataPeriod: any;
  dataLaboratorio: any;
  dataAsignatura: any;
  dataAutoFillOver: any;
  actualPeriodo: any;
  students: any = [];
  lab: any;

  constructor(
    public dialogRef: MatDialogRef<ExtraClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private pqtSrv: PaquetesService,
    private cookieSrv: CookieService,
    private toastr: ToastrService
  ) {
    this.lab = this.data.lab;
    this.createOverForm();
  }

  ngOnInit(): void {
    //const period = new Date();
    //let actualPeriodo = period.getMonth();
    //{
    //if(actualPeriodo == 02 || actualPeriodo == 03 || actualPeriodo == 04 || actualPeriodo == 05 ||
    //actualPeriodo == 06) { period = 'Feb/Jun' }
    //else if(actualPeriodo == 08 || actualPeriodo == 09 || actualPeriodo == 08 || actualPeriodo == 09
    //|| actualPeriodo == 10 || actualPeriodo == 11 || actualPeriodo == 12) { periodo = 'Ago/Dic'}
    //}
    this.autoFillTeacher();
    this.overForm.get('squad')?.disable();
    this.overForm.get('level')?.disable();
    this.overForm.get('period')?.disable();
    this.overForm.get('career')?.disable();
    this.overForm.get('hora_entrada')?.disable();
    this.overForm.get('hora_salida')?.disable();
    this.overForm.get('nameTeacher')?.disable();
    this.overForm.get('fecha')?.disable();
  }

  createOverForm() {
    let today = new Date();
    today.setDate(today.getDate() - (today.getDay() - 1) + this.data.day);
    console.log(today);

    this.overForm = this.fb.group({
      squad: ['Colomos', Validators.required],
      level: ['Tecnologo', Validators.required],
      period: ['', Validators.required],
      career: ['', Validators.required],
      laboratory: [{ value: this.lab.id_laboratorio, disabled: true }, Validators.required],
      fecha: [today.toLocaleDateString(), Validators.required],
      hora_entrada: [this.data.module.replace(' ', '').split('-')[0], Validators.required],
      hora_salida: [this.data.module.replace(' ', '').split('-')[1], Validators.required],
      nameTeacher: ['', Validators.required],
      subject: ['', Validators.required],
      group: ['', Validators.required],
    });
  }

  obtainStudentsByGroup() {
    let gradeGroup = this.overForm.get('group')?.value;
    let grade = gradeGroup.substr(0, 1);
    let group = gradeGroup.substr(1, 3);

    this.pqtSrv.obtainStudentsByGroup(grade, group).subscribe(
      (response: any) => {
        // console.log(response);
        if (response.status === 'OK') {
          this.students = response.data;
          console.log(this.students);
          this.toastr.success(response.msg, response.status);
        } else if (response.status === 'AVISO') {
          this.toastr.warning(response.msg, response.status);
        } else {
          this.toastr.error(response.msg, response.status);
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    );
  }

  removeStudent(index: number) {
    this.students.splice(index, 1);
  }

  autoFillTeacher() {
    let nomina = this.cookieSrv.get('resu');
    this.pqtSrv.autoFillTeacher(nomina).subscribe(
      (response: any) => {
        //console.log(response);
        if (response.status === 'OK') {
          let division = response.data.carrera;
          this.obtainLabs(division);
          this.obtainSubjects(division);
          this.dataAutoFillOver = response;
          this.overForm.get('career')?.setValue(division);
          this.overForm
            .get('nameTeacher')
            ?.setValue(response.data.nombreDocente);
          console.log({ response });
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    );
  }

  obtainLabs(divisionStr: string) {
    let division: number;

    divisionStr == 'Desarrollo de Software' ? (division = 1) : (division = 0);

    this.pqtSrv.obtainLabs(division).subscribe(
      (response: any) => {
        // console.log(response.data);
        if (response.status === 'OK') {
          this.dataLabs = response.data;
          console.log(this.dataLabs);
        } else {
          console.log('Error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    );
  }

  obtainSubjects(divisionStr: string) {
    let division: number;

    divisionStr == 'Desarrollo de Software' ? (division = 1) : (division = 0);

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
    );
  }


  overClass() {
    console.log("hi from sam");
   // if (this.overForm.valid) {
      console.log("es valido");
      let plantel = this.overForm.get('squad')?.value;
      let nivel = this.overForm.get('level')?.value;
      let periodo = this.overForm.get('period')?.value;
      let carrera = this.overForm.get('career')?.value;
      let laboratorio = this.overForm.get('laboratory')?.value;
      let fecha = this.overForm.get('fecha')?.value;
      let hora_entrada = this.overForm.get('hora_entrada')?.value;
      let hora_salida = this.overForm.get('hora_salida')?.value;
      let nombre = this.overForm.get('nameTeacher')?.value;
      let subject = this.overForm.get('subject')?.value;
      let group = this.overForm.get('group')?.value;
      let usuario = this.dataAutoFillOver.data.id_usuario;

      let json = {
        campus: plantel,
        level: nivel,
        period: periodo,
        career: carrera,
        laboratory: laboratorio,
        fecha: fecha,
        hr_in: hora_entrada,
        hr_out: hora_salida,
        nameTeacher: nombre,
        subject: subject,
        group: group,
        name: nombre,
        user: usuario,
        signature: 1,
      };

      this.pqtSrv.classOver(json).subscribe(
        //console.log(json),
        (response: any) => {
          if (response.status == 'OK') {
            this.toastr.success(response.msg, response.status);
            this.autoFillTeacher();
            this.overForm.reset();
            //this.btnSend = false;
          } else {
            this.toastr.error(response.msg, response.status);
          }
        },
        (error: any) => {
          console.log({ error });
        }
      );
    }
 // }
}
