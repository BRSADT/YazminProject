import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private lgnSrv: LoginService,
    private router: Router,
    private cookieSrv: CookieService,
    private toastr: ToastrService
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {
    this.checkSession();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    this.generateToken();

    if (this.token.length > 60) {
      /*
      @params
      username: string
      password: string
      token:    string
      @return
      response.data: object (data[#])
      */
      this.lgnSrv.loginUser(username, password, this.token).subscribe(
        (response: any) => {
          console.log(response);
          if (response.status == 'OK') {
            this.cookieSrv.set('nekot', response.data.token);
            this.cookieSrv.set('resu', response.data.id_usuario);
            this.cookieSrv.set('epyt', response.data.id_tipo_usuario);
            let typeUsr = response.data.id_tipo_usuario;

            switch (typeUsr) {
              case '1':
                this.router.navigate(['/dashboard']);
                break;
              case '2':
                this.router.navigate(['/teacherPackage']);
                break;
              case '3':
                this.router.navigate(['/dashboard-warehouse']);
                break;
                case '4':
                  this.router.navigate(['/dashboard-coordinator']);
                  break;

              default:
                break;
            }
          } else {
            this.toastr.error('El usuario o la contraseña es incorrecto o está vacio', 'ERROR');
            alert('El usuario o la contraseña es incorrecto o está vacio')
 
          }
        },
        (error: any) => {
          alert('El usuario o la contraseña es incorrecto o está vacio')
          console.log({ error });
        }
      )
    } else {
      alert('Ha ocurrido un error.')
    }
  }

  generateToken() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.token = result;
  }

  async checkSession(): Promise<void> {
    /*
    @params
    token: string (cookie)
    @return
    response.type: number (type[0])
    */
    await this.lgnSrv.checkToken(this.cookieSrv.get('nekot')).toPromise().then((response: any) => {
      if (response != null) {
        let cookieToken = this.cookieSrv.get('nekot');
        let responseToken = response.type[0];

        if (cookieToken != responseToken) {
          this.cookieSrv.delete('nekot');
          this.cookieSrv.delete('resu');
          this.cookieSrv.delete('epyt');
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    }).catch((err: any) => console.log(err));
  }

}
