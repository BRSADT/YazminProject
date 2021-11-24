import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login!: number;

  constructor(
    private cookieSrv: CookieService,
    private lgnSrv: LoginService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    /*
      @params
      token: string (cookie)
      @return
      id_tipo_usuario: number (type[0])
      token:           string (type[1])
    */
    await this.lgnSrv.checkToken(this.cookieSrv.get('nekot')).toPromise().then((response: any) => {
      if (response != null) {
        let cookieToken = this.cookieSrv.get('nekot');
        let responseToken = response.type[1];
        
        
        if (cookieToken != responseToken) {
          this.cookieSrv.delete('nekot');
          this.cookieSrv.delete('resu');
          this.cookieSrv.delete('epyt');
          this.router.navigate(['/login']);
        } else {
          this.login = parseInt(this.cookieSrv.get('epyt'));
        }
      } else {
        this.router.navigate(['/login']);
      }
    }).catch((err: any) => console.log(err));
  }

  logout(): any {
    this.cookieSrv.delete('nekot');
    this.cookieSrv.delete('resu');
    this.cookieSrv.delete('epyt');
    this.router.navigate(['/login']);
  }

}
