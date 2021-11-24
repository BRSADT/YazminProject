import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes/paquetes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signature-request',
  templateUrl: './signature-request.component.html',
  styleUrls: ['./signature-request.component.css']
})
export class SignatureRequestComponent implements OnInit {
  dataExtraClass!: any
  item!: any

  constructor(private pqtSrv: PaquetesService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  /*
  @return
  response.status: string
  response.data:   array
  */
  obtainGeneralHours() {
    this.pqtSrv.obtainGeneralHours().subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.dataExtraClass = response.data;
          if (response.data.length === 0) {
            this.toastr.warning('No hay formatos para firmar!', 'AVISO');
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

  firmExtraClass(id: number) {
    this.pqtSrv.udtFirmExtraClass(id).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.toastr.success(response.msg, response.status);
          this.obtainGeneralHours();
          // Verifiacr validaciones
        } else {
          this.toastr.error(response.msg, response.status);
          // alert('Ha ocurrido un error');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  removeHours(id: number) {
    this.pqtSrv.removeHours(id).subscribe(
      (response: any) => {
       // console.log(response);
        if (response.status == 'OK') {
          this.obtainGeneralHours();
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

