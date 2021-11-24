import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes/paquetes.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-firm-vales',
  templateUrl: './firm-vales.component.html',
  styleUrls: ['./firm-vales.component.css']
})
export class FirmValesComponent implements OnInit {
  valeFirm!: any;
  getValesPerAsigment!: any;
  firmVales!: any;
  dataFirmVale!: any;
  dataFirmValeMaterials!: any;
  firmVals!: any;
  id_nomina!: number;
  valeStudent!: any;
  firm!: any;
  disable: boolean = false;

  constructor(private pqtSrv: PaquetesService, private toastr: ToastrService, private cookieSrv: CookieService) { }

  ngOnInit(): void {
    this.id_nomina = parseInt(this.cookieSrv.get('resu'));
  }

  /*
  @return
  response.data: object
  */
  asigment() {
    this.pqtSrv.firmVales(this.id_nomina).subscribe(
      (response: any) => {
        console.log(this.id_nomina);
        if (response.status == 'OK') {
          this.firmVales = response.data;
          console.log(typeof this.firmVales);
          
          if (response.data.length === 0) {
            this.toastr.warning('No hay vales para firmar!', 'AVISO');
          }
        } else {
          this.toastr.error('Ha ocurrido un error', 'ERROR');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  /*
  @params
  index: number
  id:    number
  @return
  response.data: object
  */
  viewVale(index: number, id: number) {
    this.dataFirmVale = this.firmVales[index];
    this.pqtSrv.obtainMaterialsVale(id).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.dataFirmValeMaterials = response.data;
          (this.dataFirmValeMaterials) ? this.disable = true : this.disable = false;
        } else {
          this.dataFirmValeMaterials = []
          this.toastr.error('Ha ocurrido un error o no se han encontrado materiales', 'ERROR');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  /*
  @params
  id: number
  @return
  response.status: string
  */
  firmVale(id: number) {
    this.pqtSrv.udtFirmVal(id).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.asigment();
          this.toastr.success(response.msg, response.status);
        } else {
          alert('Ha ocurrido un error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  /*
  @params
  id: number
  @return
  response.status: string
  */
  removeVal(id: number) {
    this.pqtSrv.removeVal(id).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.asigment();
          this.toastr.success(response.msg, response.status);
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
