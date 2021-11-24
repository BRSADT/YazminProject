import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { CreateValeComponent } from './create-vale/create-vale.component';
import { AdeudodocComponent } from './adeudodoc/adeudodoc.component';
import { FirmValesComponent } from './firm-vales/firm-vales.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeacherPackageComponent } from './teacher-package/teacher-package.component';
import { CreatePackageComponent } from './teacher-package/create-package/create-package.component';
import { ViewPackageComponent } from './teacher-package/view-package/view-package.component';
import { ExtraclassFormatComponent } from './extra-class-format/extra-class-format.component';
import { SignatureRequestComponent } from './signature-request/signature-request.component';
import { CreateValePrioriComponent } from './create-vale-priori/create-vale-priori.component';
import { CreateValeTeacherComponent } from './create-vale-teacher/create-vale-teacher.component';
import { ExtraClassDashboardComponent } from './extra-class-dashboard/extra-class-dashboard.component';
import { DashboardCoordinatorComponent} from './dashboard-coordinator/dashboard-coordinator.component';



import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {ExtraClassDialogComponent} from './extra-class-dialog/extra-class-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DashboardWarehouseComponent } from './dashboard-warehouse/dashboard-warehouse.component';
import { ViewFormatComponent } from './view-format/view-format.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PaquetesComponent,
    CreateValeComponent,
    AdeudodocComponent,
    FirmValesComponent,
    NavbarComponent,
    TeacherPackageComponent,
    CreatePackageComponent,
    ViewPackageComponent,
    ExtraclassFormatComponent,
    SignatureRequestComponent,
    CreateValePrioriComponent,
    CreateValeTeacherComponent,
    ExtraclassFormatComponent,
    ExtraClassDashboardComponent,
    ExtraClassDialogComponent,
    DashboardWarehouseComponent,
    ViewFormatComponent,
    DashboardCoordinatorComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents: [ExtraClassDialogComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
