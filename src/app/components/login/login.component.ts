import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { firebaseError } from 'src/app/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    console.log("register",email);
    
    this.afAuth.
    signInWithEmailAndPassword(email, password).
    then((user) => {
      this.loading=false;
      this.toastr.success("user authenticated!");
      if (user.user?.emailVerified) {
        this.router.navigate(['/dashboard']);
      }else{
        this.router.navigate(['/verify-email']);
      }
  
      console.log(user);
    }).
    catch((error) => {
      this.loading=false;
      console.log(error);
      this.toastr.error(firebaseError(error.code));
    });
  }

  ngOnInit(): void { }
}
