import { Component, OnInit, ViewChild } from '@angular/core';
import { PaquetesService } from './paquetes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {

  @ViewChild('openModalPackage', { static: true }) openModalPackage: any;

  packages: any = [];
  dataPackages: any;
  dataPackagesMaterials: any = [];
  btnSend: boolean = false
  dataWarehouse: any
  items: any = [];
  dataAutoFillVale: any;

  constructor(private pqtSrv: PaquetesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtainPackages();
    this.obtainWarehouse();
  }

  obtainPackages() {
    this.pqtSrv.packageStudent().subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.packages = response.data;
          console.log(this.packages);

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

  obtainWarehouse() {
    /*
    @return
    response.status: string
    response.data:   object
    */
    this.pqtSrv.obtainTools().subscribe(
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

  itemSelected(index: number, idMat: number, nombre: string, no_inv: number) {
    if (this.items.push({ index, idMat, nombre, no_inv })) {
      this.dataWarehouse.splice(index, 1);
    }
    if (this.items.length > 0) {
      this.btnSend = true;
    }
  }

  /*
  @params
  index: number
  id:    string
  @return
  response.data: object
  */
  viewVale(index: number, id: string) {
    this.dataPackages = this.packages[index];
    this.pqtSrv.obtainMaterialsVale(parseInt(id)).subscribe(
      (response: any) => {
        console.log(response);

        if (response.status == 'OK') {
          this.dataPackagesMaterials = response.data;
          // (this.dataPackagesMaterials) ? this.disable = true : this.disable = false;
        } else {
          this.dataPackagesMaterials = []
          this.toastr.error('Ha ocurrido un error o no se han encontrado materiales', 'ERROR');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }





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

  // modalPackage(index: number) {
  //   this.openModalPackage.nativeElement.click();
  //   this.modalValeData = this.valeData[index];
  // }

}
