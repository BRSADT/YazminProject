import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**LOGIN**/
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdeudodocComponent } from './adeudodoc/adeudodoc.component';
import { FirmValesComponent } from './firm-vales/firm-vales.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { TeacherPackageComponent } from './teacher-package/teacher-package.component';
import { ExtraclassFormatComponent } from './extra-class-format/extra-class-format.component';
import { SignatureRequestComponent } from './signature-request/signature-request.component';
/**VALES**/
import { CreateValeComponent } from './create-vale/create-vale.component';
import { CreateValePrioriComponent } from './create-vale-priori/create-vale-priori.component';
import { CreateValeTeacherComponent } from './create-vale-teacher/create-vale-teacher.component';
import { ExtraClassDashboardComponent } from './extra-class-dashboard/extra-class-dashboard.component';
import { DashboardWarehouseComponent } from './dashboard-warehouse/dashboard-warehouse.component';
import { DashboardCoordinatorComponent} from './dashboard-coordinator/dashboard-coordinator.component';
import { ViewFormatComponent } from './view-format/view-format.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard-warehouse', component: DashboardWarehouseComponent },
  { path: 'dashboard-coordinator', component: DashboardCoordinatorComponent },
  { path: 'teacherPackage', component: TeacherPackageComponent },
  { path: 'firmVales', component: FirmValesComponent },
  { path: 'createVale', component: CreateValeComponent },
  { path: 'createValePriori', component: CreateValePrioriComponent },
  { path: 'createValeTeacher', component: CreateValeTeacherComponent },
  { path: 'adeudodoc', component: AdeudodocComponent },
  { path: 'paquetes', component: PaquetesComponent },
  { path: 'extraclass', component: ExtraClassDashboardComponent },
  { path: 'extraclassformat', component: ExtraclassFormatComponent },
  { path: 'signatureRequest', component: SignatureRequestComponent },
  { path: 'viewFormat', component: ViewFormatComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }