import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PaquetesService } from 'src/app/paquetes/paquetes.service';

@Component({
  selector: 'app-view-package',
  templateUrl: './view-package.component.html',
  styleUrls: ['./view-package.component.css']
})
export class ViewPackageComponent implements OnInit {

  teacherPackages: any = [];
  dataTeacherPackages: any = [];
  dataTeacherPackagesMaterials: any = [];

  constructor(private pqtSrv: PaquetesService, private toastr: ToastrService, private cookieSrv: CookieService) { }

  ngOnInit(): void {
    this.obtainPackages();
  }

  obtainPackages() {
    this.pqtSrv.obtainPackageTeacher(parseInt(this.cookieSrv.get('resu'))).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.teacherPackages = response.data;
          console.log(this.teacherPackages);

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

  /*
  @params
  index: number
  id:    string
  @return
  response.data: object
  */
  viewVale(index: number, id: string) {
    this.dataTeacherPackages = this.teacherPackages[index];
    this.pqtSrv.obtainMaterialsVale(parseInt(id)).subscribe(
      (response: any) => {
        console.log(response);

        if (response.status == 'OK') {
          this.dataTeacherPackagesMaterials = response.data;
          // (this.dataTeacherPackagesMaterials) ? this.disable = true : this.disable = false;
        } else {
          this.dataTeacherPackagesMaterials = []
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
  id:    number
  @return
  response.response: string
  */
  deletePackage(id: string) {
    this.pqtSrv.removeVal(parseInt(id)).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.obtainPackages();
          this.toastr.success('Se ha eliminado el paquete con éxito', 'OK');
        } else {
          this.toastr.error('Ha ocurrido un error o no se ha podido eliminar el paquete', 'ERROR');
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

}
