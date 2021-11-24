import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard/dashboard.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-coordinator',
  templateUrl: './dashboard-coordinator.component.html',
  styleUrls: ['./dashboard-coordinator.component.css']
})
export class DashboardCoordinatorComponent implements OnInit {
  session: any = [];

  @ViewChild('btnModal', { static: true }) btnModal: any;
  @ViewChild('closeModalChangePassword', { static: true }) closeModalChangePassword: any;

  changePasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashSrv: DashboardService,
    private cookieSrv: CookieService,
    private toastr: ToastrService
  ) {
    this.createChangePasswordForm();
  }

  ngOnInit(): void {
    this.session = this.cookieSrv.getAll();
    this.verifyPassword();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required]
    });
  }

  verifyPassword() {
    /*
    @params
    user: number
    @return
    response.status: string
    */
    this.dashSrv.verifyPassword(this.session.resu).subscribe(
      (response: any) => {
        if (response && response.status === 'EQUALS') {
          console.log();
          this.btnModal.nativeElement.click();
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

  changePassword() {
    let newPassword = this.changePasswordForm.get('newPassword')?.value;
    /*
    @params
    user:        number
    newPassword: string
    @return
    response.status: string
    */
    this.dashSrv.changePassword(this.session.resu, newPassword).subscribe(
      (response: any) => {
        if (response.status == 'OK') {
          this.closeModalChangePassword.nativeElement.click();
          this.toastr.success(response.msg, response.status);
        } else {
          this.toastr.error(response.msg, response.status);
          console.log(response.status)
        }
      },
      (error: any) => {
        console.log({ error });
      }
    )
  }

}

