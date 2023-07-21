import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firebaseError } from 'src/app/utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  loading: boolean = false;
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  restablecerPassword() {
    this.loading = true;
    const email = this.resetPasswordForm.value.email;
    
    this.afAuth.sendPasswordResetEmail(email)
    .then(() => {
      this.loading=false;
      this.toastr.info("Email sent successfully");
      this.router.navigate(['/login']);
    }).
    catch((error) => {
      this.loading=false;
      console.log(error);
      this.toastr.error(firebaseError(error.code));
    });
  }
}
