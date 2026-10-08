import { Component } from '@angular/core';
import { version } from '../shared/enums/general.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationSerivce } from '../shared/services/authentification-service/authentification-serivce';
import { Login } from '../shared/models/client/profile';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public isLoading!: boolean;
  public isFirstSignIn!: boolean;
  public version : string = version;

  constructor(
    private AuthService: AuthentificationSerivce,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.router.navigate(['main/portal']);
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.registerForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]),
    });

   // this.router.navigate(['main/overview/1']);
  }

  public signIn() {
    this.isLoading = true;
    this.AuthService.login(this.loginForm.value).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        if (!res.profile) {
          this.isFirstSignIn = true;
        } else {
          this.router.navigate(['main/portal']);
        }
      }
    });
  }

  public register() {
    this.isLoading = true;
    let newLogin: Login = {
      username: this.loginForm.get('username')?.value,
      password: this.registerForm.get('password')?.value
    };
    this.AuthService.register(newLogin).subscribe(res => {
      if (res) {
        this.registerForm.reset();
        this.loginForm.patchValue({
          username: newLogin.username,
          password: ''
        });
        this.isLoading = false;
        this.isFirstSignIn = false;
      }
    })

  }

  public passwordConfirm(event: any) {
    let newPassword: string = event.target.value;
    if (newPassword != this.registerForm.get('password')?.value) {
      this.registerForm.get('confirmPassword')?.setErrors({ notConform: true });
    }
  }

  public enableConfirmPassword() {
    if (this.registerForm.get('password')?.valid) {
      this.registerForm.get('confirmPassword')?.enable();
    }
  }
}
