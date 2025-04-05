import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormSubmitComponent } from '../../../design-system/organisms/form-submit/form-submit.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { VALIATORS_EMAIL_MAX_LENGTH, VALIDATORS_PASSWORD_MAX_LENGTH } from '../../../shared/constants/login.constants';
import { ImageOptimizedComponent } from "../../../design-system/atoms/image-optimized/image-optimized.component";
import { ImageOptimizedProps } from '../../../shared/types/types-prop-design-system/atoms/ImageOptimizedProps.type';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormSubmitComponent, ReactiveFormsModule, ImageOptimizedComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  import = '/assets/login.png';
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService)
  public loginFormGroup !: FormGroup;

  imageLogin: ImageOptimizedProps = {
    imagePath: this.import,
    width: 1000,
    height: 999
  }

  btnFormSubmitProps: ButtonProps = {
    buttonName: 'Login',
    buttonType: 'submit'
  };

  buttons : ButtonProps[] = [this.btnFormSubmitProps];

  fields = [
    {nameLabel: 'Email', formControlName: 'email', inputType: 'text', validators: [Validators.required, Validators.maxLength(VALIATORS_EMAIL_MAX_LENGTH)], maxLength: VALIATORS_EMAIL_MAX_LENGTH},
    {nameLabel: 'Password', formControlName: 'password', inputType: 'password', validators: [Validators.required, Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH)], maxLength: VALIDATORS_PASSWORD_MAX_LENGTH}
  ]

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(VALIATORS_EMAIL_MAX_LENGTH)]],
      password: ['', [Validators.required, Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH)]]
    });
  }

  getFormControl(name: string): FormControl {
    return this.loginFormGroup.get(name) as FormControl;
  }

  onSubmit(): void {
    if (this.loginFormGroup.valid) {
      this.authService.logIn(this.loginFormGroup.value).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
