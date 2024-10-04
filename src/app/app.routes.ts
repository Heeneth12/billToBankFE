import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BillToBankComponent } from './views/bill-to-bank/bill-to-bank.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { AuthGuard } from './layouts/auth/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]  },
  { path: 'bill-to-bank', component: BillToBankComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

