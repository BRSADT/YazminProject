import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login/login.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private lgnServ: LoginService, private router: Router, private cookieSrv: CookieService) { }

    async canActivate() {
        let resp = await this.lgnServ.checkToken(this.cookieSrv.get('nekot'));
        if (resp) {
            console.log(resp);

            this.router.navigate(['/dashboard']);
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    // canActivate(): any {
    //     this.lgnServ.checkToken(this.cookieSrv.get('nekot')).subscribe(
    //         (response: any) => {
    //             console.log(response.type);
    //         },
    //         (error: any) => {
    //             console.log({ error });
    //         }
    //     )

    // }

}