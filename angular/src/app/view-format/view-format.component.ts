import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../paquetes/paquetes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-format',
  templateUrl: './view-format.component.html',
  styleUrls: ['./view-format.component.css']
})
export class ViewFormatComponent implements OnInit {
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
}