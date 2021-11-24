import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    baseUrl = 'http://localhost/PIAlmacen/php';

    constructor(private http: HttpClient) { }

    verifyPassword(username: string) {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/verifyPassword.php`, JSON.stringify(username), headers);
    }

    changePassword(username: string, password: string): any {
        // console.log('service: ', password);
        let headers: any = {};
        let data = {
            'username': username,
            'password': password
        }
        return this.http.post(`${this.baseUrl}/changePassword.php`, JSON.stringify(data), headers);
    }
}