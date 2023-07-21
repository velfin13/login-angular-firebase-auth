import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, LoginComponent, SingUpComponent, VerifyEmailComponent } from './components';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sing-up', component: SingUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ResetPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
