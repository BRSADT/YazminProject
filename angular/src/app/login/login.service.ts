import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    baseUrl = 'http://localhost/PIAlmacen/php';

    constructor(private http: HttpClient) { }

    loginUser(username: string, password: string, token: string): any {
        // console.log('service: ', username, password, token);
        let headers: any = {};
        let data = {
            'username': username,
            'password': password,
            'token': token
        }
        return this.http.post(`${this.baseUrl}/login.php`, JSON.stringify(data), headers);
    }

    checkToken(token: string): any {
        // console.log({ token });
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/verifyToken.php`, JSON.stringify(token), headers);
    }
}
