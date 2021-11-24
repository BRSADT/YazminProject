import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PaquetesService {
    baseUrl = 'http://localhost/PIAlmacen/php';

    constructor(private http: HttpClient) { }

    autoFillStudent(resgister: any): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/autoFillStudent.php`, JSON.stringify(resgister), headers);
    }

    autoFillTeacher(nomina: any): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/autoFillTeacher.php`, JSON.stringify(nomina), headers);
    }

    obtainStudent(gradoGrupo: string): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/obtainPackage.php`, gradoGrupo, headers);
    }

    valeUser(dataJson: any, items: any): any {
        let headers: any = {}
        let body = [
            dataJson,
            items
        ];
        return this.http.post(`${this.baseUrl}/insertPackage.php`, JSON.stringify(body), headers);
    }

    packageStudent(): any {
        let headers: any = {};
        return this.http.get(`${this.baseUrl}/obtainPackage.php`, headers);
    }

    obtainPackageTeacher(idNomina: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/obtainPackage.php`, idNomina, headers);
    }

    obtainWarehouse(): any {
        let headers: any = {};
        return this.http.get(`${this.baseUrl}/dataWarehouse.php`, headers);
    }

    obtainTools(): any {
        let headers: any = {};
        return this.http.get(`${this.baseUrl}/getTools.php`, headers);
    }

    obtainTeachers(): any {
        let headers: any = {};
        return this.http.get(`${this.baseUrl}/dataTeachers.php`, headers);
    }

    obtainLabs(division: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/obtainLabs.php`, division, headers);
    }

    obtainSubjects(division: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/obtainSubjects.php`, division, headers);
    }

    generalDebts(type: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/generalDebts.php`, type, headers);
    }

    obtainMaterialsVale(id: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/materialsPerVale.php`, id, headers);
    }

    removeDebt(id: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/deleteVales.php`, id, headers);
    }

    firmVales(id: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/firmVal.php`, id, headers);
    }

    udtFirmVal(id: number) {
        console.log(id);
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/firmaVale.php`, id, headers);
    }

    removeVal(id: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/deleteVales.php`, id, headers);
    }

    classOver(dataJson: any): any {
        console.log("aq"+dataJson)

        let headers: any = {}
        let body = [
            dataJson,
        ];
        return this.http.post(`${this.baseUrl}/insertFormatExtra.php`, JSON.stringify(body), headers);
    }

    obtainPeriod(id: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/perido.php`, id, headers);
    }

    obtainGeneralHours() {
        return this.http.get(`${this.baseUrl}/obtainExtraClass.php`);
    }

    udtFirmExtraClass(id: number) {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/firmExtraclase.php`, id, headers);
    }

    removeHours(id: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/deleteHour.php`, id, headers);
    }

    obtainStudentsByGroup(grade: number, group: string): any {
        let headers: any = {};
        let body = [
            grade,
            group
        ]
        return this.http.post(`${this.baseUrl}/obtainStudentsByGroup.php`, JSON.stringify(body), headers);
    }
}
