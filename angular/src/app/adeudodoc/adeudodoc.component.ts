import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes/paquetes.service';

@Component({
  selector: 'app-adeudodoc',
  templateUrl: './adeudodoc.component.html',
  styleUrls: ['./adeudodoc.component.css']
})
export class AdeudodocComponent implements OnInit {

  dataDebts!: any;
  dataDebtVale!: any;
  dataDebtValeMaterials!: any;
  deleteVal!: any;
  constructor(private pqtSrv: PaquetesService) { }

  ngOnInit(): void {
  }

  obtainDataDebts(type: any) {
    this.pqtSrv.generalDebts(type).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.dataDebts = response.data;
        } else {
          if (!this.dataDebts) {
            alert('No hay información para mostrar');
          } else {
            alert('Ha ocurrido un error');
          }
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  viewVale(index: number, id: number) {
    this.dataDebtVale = this.dataDebts[index];
    this.pqtSrv.obtainMaterialsVale(id).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.dataDebtValeMaterials = response.data;
        } else {
          alert('Ha ocurrido un error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  removeDebt(index: number, id: number) {
    this.pqtSrv.removeDebt(id).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.dataDebts.splice(index, 1);
          console.log(response);
        } else {
          alert('Ha ocurrido un error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

}