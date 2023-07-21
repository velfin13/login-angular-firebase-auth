import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firebaseError } from 'src/app/utils';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  registerUser: FormGroup
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) {
    this.registerUser = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  register() {
    this.loading = true;
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;
    console.log("register", email);


    if (password !== repeatPassword) {
      this.toastr.error("passwords do not match!");
      return;
    }

    this.afAuth.
      createUserWithEmailAndPassword(email, password).
      then((user) => {
        this.verifyEmail();
      }).
      catch((error) => {
        this.loading = false;
        console.log(error);
        this.toastr.error(firebaseError(error.code));
      });
    this.loading = false;
  }

  verifyEmail() {
    this.afAuth.currentUser.then((user) => {
      user?.sendEmailVerification()
        .then((email) => {
          this.loading = false;
          this.toastr.info("user registered successfully", 'verify your email')
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.log(error);

        });
    });
  }

  ngOnInit(): void { }


}
