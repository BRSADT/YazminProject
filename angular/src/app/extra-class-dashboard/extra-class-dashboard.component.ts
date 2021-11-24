import { ExtraClassDialogComponent } from './../extra-class-dialog/extra-class-dialog.component';
import { PaquetesService } from './../paquetes/paquetes.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface HoraExtraTile {
  materia: string;
  ocupada: boolean;
}

interface HorarioExtraClaseRow {
  modulo: number;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
}

export interface DialogData {
  module: string;
  day: number;
  lab: any;
}

const ELEMENT_DATA: HorarioExtraClaseRow[] = [
  {modulo: 0, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 1, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 2, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 3, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 4, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 5, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 6, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 7, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
  {modulo: 8, lunes: true, martes: true, miercoles: true, jueves: true, viernes: true},
];

@Component({
  templateUrl: './extra-class-dashboard.component.html',
  styleUrls: ['./extra-class-dashboard.component.css']
})
export class ExtraClassDashboardComponent implements OnInit {
  laboratory: string;
  laboratories: any[];

  modulesHours = [
    "7:00 - 7:50",
    "7:50 - 8:40",
    "8:40 - 9:30",
    "9:30 - 10:20",
    "10:20 - 11:10",
    "11:10 - 12:00",
    "12:00 - 12:50",
    "12:50 - 13:40",
    "13:40 - 14:30"
  ];

  displayedColumns: string[] = ['modulo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = ELEMENT_DATA;

  constructor(
    private phpBackend: PaquetesService,
    private cookieSrv: CookieService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.laboratory = "";
    this.laboratories = [];
  }

  ngOnInit(): void {
    this.getInitialData();
  }


  private async getInitialData() {
    const nomina = this.cookieSrv.get('resu');

    try {
      let response = await this.phpBackend.autoFillTeacher(nomina).toPromise();
      console.log(response);
      if (response.status == 'OK') {
        await this.obtainLabs(response.data.carrera);
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  private async obtainLabs(divisionStr: string) {
    let division: number;

    
    divisionStr == 'Desarrollo de Software' ? (division = 1) : (division = 0);

    try {
      const response = await this.phpBackend.obtainLabs(division).toPromise();

      if (response.status === 'OK') {
        this.laboratories = response.data;
        console.log(this.laboratories);
      } else {
        console.log('Error');
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  public updateDashboard() {
    console.log("Show dashboard for laboratory " + this.laboratory);
  }

  openDialog(module: string, day: number): void {
    console.log("module: " + module);
    console.log("day: " + day);

    const lab = this.laboratories.find(lab => lab.id_laboratorio == this.laboratory);
    console.log(lab);

    const dialogRef = this.dialog.open(ExtraClassDialogComponent, {
      width: '1000px',
      height: '600px',
      data: { module: module, day: day, lab: lab }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.updateDashboard();
    });
  }
}
