
import { Component, inject, OnInit } from '@angular/core';
import { FormSubmitComponent } from "../../../design-system/organisms/form-submit/form-submit.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Servicios
import { CountryService } from '../../../shared/services/user/country/country.service';
import { PaymentInfoService } from '../../../shared/services/user/payment-info/payment-info.service';
import { RegionService } from '../../../shared/services/user/region/region.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { UserService } from '../../../shared/services/user/user.service';

// Modelos
import { Country } from '../../../shared/models/country.model';
import { PaymentInfoTypes, PaymentInfoProviders } from '../../../shared/models/payment-info.model';
import { Region } from '../../../shared/models/region.model';
import { ToastType } from '../../../shared/models/toast.model';
import { CreateUserRequestDto, PaymentMethodRequestDto } from '../../../shared/models/user.model';

// Tipos y constantes
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { Field } from '../../../shared/types/types-utils-design-system/FieldProps.type';
import { 
  VALIDATORS_EMAIL_MAX_LENGTH, 
  VALIDATORS_PHONE_MAX_LENGTH 
} from '../../../shared/constants/register.constants';
import { VALIDATORS_PASSWORD_MAX_LENGTH } from '../../../shared/constants/login.constants';

// Enums
enum UserRoles {
  CUSTOMER = 2,
  PROVIDER = 3
}

enum FormSteps {
  ROLE_SELECTION = 0,
  USER_INFO = 1,
  PAYMENT_INFO = 2
}

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormSubmitComponent, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnInit {
  private readonly PHONE_PATTERN = /^\+?\d+$/;
  
  // Servicios inyectados
  private formBuilder = inject(FormBuilder);
  private countryService = inject(CountryService);
  private regionService = inject(RegionService);
  private paymentInfoService = inject(PaymentInfoService);
  private toastService = inject(ToastService);
  private userService = inject(UserService);

  // Datos de formulario
  formGroup!: FormGroup;
  currentStep = FormSteps.ROLE_SELECTION;
  roleId = 0;
  
  // Datos de listas
  countries: Country[] = [];
  regions: Region[] = [];
  paymentTypes: PaymentInfoTypes[] = [];
  paymentProviders: PaymentInfoProviders[] = [];
  
  // Botones
  customerUserBtn: ButtonProps = { 
    buttonName: 'Create Customer User', 
    buttonType: 'button', 
    onClick: () => this.selectRole(UserRoles.CUSTOMER) 
  };
  
  providerUserBtn: ButtonProps = { 
    buttonName: 'Create Provider User', 
    buttonType: 'button', 
    onClick: () => this.selectRole(UserRoles.PROVIDER) 
  };

  backToRoleSelectionBtn: ButtonProps = {
    buttonName: 'Change User Type',
    buttonType: 'button',
    onClick: () => this.backToRoleSelection()
  };
  
  nextBtnProps: ButtonProps = { 
    buttonName: 'Next', 
    buttonType: 'button', 
    onClick: () => this.nextStep() 
  };
  
  prevBtnProps: ButtonProps = { 
    buttonName: 'Prev', 
    buttonType: 'button', 
    onClick: () => this.prevStep() 
  };
  
  submitBtnProps: ButtonProps = { 
    buttonName: 'Send', 
    buttonType: 'submit', 
    onClick: () => this.onSubmit() 
  };

  // Campos de formulario
  userFields: Field[] = [
    { 
      nameLabel: 'Name', 
      formControlName: 'name', 
      inputType: 'text', 
      validators: [Validators.required], 
      maxLength: 30 
    },
    { 
      nameLabel: 'Surname', 
      formControlName: 'surname', 
      inputType: 'text', 
      validators: [Validators.required], 
      maxLength: 30 
    },
    { 
      nameLabel: 'Email', 
      formControlName: 'email', 
      inputType: 'email', 
      validators: [
        Validators.required, 
        Validators.email, 
        Validators.maxLength(VALIDATORS_EMAIL_MAX_LENGTH)
      ], 
      maxLength: VALIDATORS_EMAIL_MAX_LENGTH 
    },
    { 
      nameLabel: 'Phone', 
      formControlName: 'phone', 
      inputType: 'text', 
      validators: [Validators.required], 
      maxLength: 15 
    },
    { 
      nameLabel: 'Password', 
      formControlName: 'password', 
      inputType: 'password', 
      validators: [
        Validators.required, 
        Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH)
      ], 
      maxLength: VALIDATORS_PASSWORD_MAX_LENGTH 
    },
    { 
      nameLabel: 'Birthday', 
      formControlName: 'birthdate', 
      inputType: 'date', 
      validators: [Validators.required], 
      maxLength: 10 
    },
    { 
      nameLabel: 'Country', 
      formControlName: 'countryId', 
      inputType: 'select', 
      validators: [Validators.required], 
      options: [] 
    },
    { 
      nameLabel: 'Region', 
      formControlName: 'regionId', 
      inputType: 'select', 
      validators: [Validators.required], 
      options: [] 
    }
  ];
  
  paymentFields: Field[] = [
    { 
      nameLabel: 'Type Payment', 
      formControlName: 'paymentTypeId', 
      inputType: 'select', 
      validators: [Validators.required], 
      options: [] 
    },
    { 
      nameLabel: 'Provider Payment', 
      formControlName: 'paymentProviderType', 
      inputType: 'select', 
      validators: [Validators.required], 
      options: [] 
    },
    { 
      nameLabel: 'Account No.', 
      formControlName: 'accountNo', 
      inputType: 'text', 
      validators: [Validators.required], 
      maxLength: 20 
    },
    { 
      nameLabel: 'Expiry Date', 
      formControlName: 'expiry', 
      inputType: 'date', 
      validators: [Validators.required], 
      maxLength: 10 
    }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
  }

  // Inicialización del formulario
  private initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.maxLength(VALIDATORS_EMAIL_MAX_LENGTH)
      ]],
      phone: ['', [
        Validators.required,
        Validators.maxLength(VALIDATORS_PHONE_MAX_LENGTH)
      ]],
      password: ['', [
        Validators.required, 
        Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH)
      ]],
      birthdate: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      regionId: ['', [Validators.required]],
      paymentTypeId: ['', [Validators.required]],
      paymentProviderType: ['', [Validators.required]],
      accountNo: ['', [Validators.required]],
      expiry: ['', [Validators.required]]
    });
  }

  // Carga de datos iniciales
  private loadInitialData(): void {
    this.countryService.getAllCountriesInfo().subscribe({
      next: (countries) => this.handleCountriesLoaded(countries),
      error: this.handleDataLoadError
    });

    this.regionService.getAllRegionsInfo().subscribe({
      next: (regions) => this.handleRegionsLoaded(regions),
      error: this.handleDataLoadError
    });

    this.paymentInfoService.getAllPaymentInfoTypes().subscribe({
      next: (paymentTypes) => this.handlePaymentTypesLoaded(paymentTypes),
      error: this.handleDataLoadError
    });

    this.paymentInfoService.getAllPaymentInfoProvider().subscribe({
      next: (paymentProviders) => this.handlePaymentProvidersLoaded(paymentProviders),
      error: this.handleDataLoadError
    });
    
  }

  // Manejadores de carga de datos
  private handleCountriesLoaded(countries: Country[]): void {
    this.countries = countries;
    this.updateCountryOptions();
  }

  private handleRegionsLoaded(regions: Region[]): void {
    this.regions = regions;
    this.updateRegionOptions();
  }

  private handlePaymentTypesLoaded(paymentTypes: PaymentInfoTypes[]): void {
    this.paymentTypes = paymentTypes;
    this.updatePaymentTypeOptions();
  }

  private handlePaymentProvidersLoaded(paymentProviders: PaymentInfoProviders[]): void {
    this.paymentProviders = paymentProviders;
    this.updatePaymentProviderOptions();
  }

  private handleDataLoadError = (error: any): void => {
    console.error('Error loading data:', error);
    this.toastService.showToast('Error loading data. Please try again.', ToastType.ERROR);
  }

  // Actualización de opciones en campos select
  private updateCountryOptions(): void {
    const countryField = this.findFieldByName(this.userFields, 'countryId');
    if (countryField) {
      countryField.options = this.countries.map(c => ({ 
        value: c.id, 
        label: c.countryName 
      }));
    }
  }

  private updateRegionOptions(): void {
    const regionField = this.findFieldByName(this.userFields, 'regionId');
    if (regionField) {
      regionField.options = this.regions.map(r => ({ 
        value: r.id, 
        label: r.regionName 
      }));
    }
  }

  private updatePaymentTypeOptions(): void {
    const paymentTypeField = this.findFieldByName(this.paymentFields, 'paymentTypeId');
    if (paymentTypeField) {
      paymentTypeField.options = this.paymentTypes.map(p => ({ 
        value: p.id, 
        label: p.paymentTypeName 
      }));
    }
  }

  private updatePaymentProviderOptions(): void {
    const paymentProviderField = this.findFieldByName(this.paymentFields, 'paymentProviderType');
    if (paymentProviderField) {
      paymentProviderField.options = this.paymentProviders.map(p => ({ 
        value: p.id, 
        label: p.paymentProviderName 
      }));
    }
  }

  // Navegación entre pasos
  selectRole(roleId: number): void {
    this.roleId = roleId;
    this.currentStep = FormSteps.USER_INFO;
  }

  backToRoleSelection(): void {
    this.currentStep = FormSteps.ROLE_SELECTION;
    this.roleId = 0;
    this.formGroup.reset();
  }

  nextStep(): void {
    if (this.currentStep === FormSteps.USER_INFO) {
      if (!this.validateUserInfoStep()) return;
      this.currentStep = FormSteps.PAYMENT_INFO;
    }
  }

  prevStep(): void {
    if (this.currentStep === FormSteps.PAYMENT_INFO) {
      this.currentStep = FormSteps.USER_INFO;
    }
  }

  // Validaciones
  private validateUserInfoStep(): boolean {
    const userFieldNames = this.userFields.map(field => field.formControlName);
    
    if (!this.validateRequiredFields(userFieldNames)) return false;
    if (!this.validatePhoneNumber()) return false;
    if (!this.validateBirthdate()) return false;
    if (!this.validateRegionBelongsToCountry()) return false;
    
    return true;
  }

  private validateRequiredFields(fieldNames: string[]): boolean {
    const invalidFields = fieldNames.filter(fieldName => {
      const control = this.formGroup.get(fieldName);
      return control?.invalid;
    });

    if (invalidFields.length > 0) {
      this.showValidationErrors(invalidFields);
      return false;
    }
    
    return true;
  }

  private validatePhoneNumber(): boolean {
    const phoneControl = this.formGroup.get('phone');
    if (!phoneControl?.value) return false;
  
    if (!this.PHONE_PATTERN.test(phoneControl.value)) {
      this.toastService.showToast('Formato de número telefónico inválido.', ToastType.WARNING);
      return false;
    }
  
    return true;
  }

  private validateBirthdate(): boolean {
    const birthdateControl = this.formGroup.get('birthdate');
    if (!birthdateControl?.value) return false;
  
    const birthdate = new Date(birthdateControl.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (birthdate > today) {
      this.toastService.showToast('La fecha de nacimiento no puede ser en el futuro.', ToastType.WARNING);
      return false;
    }
  
    return true;
  }

  private validateRegionBelongsToCountry(): boolean {
    const regionId = this.formGroup.get('regionId')?.value;
    const countryId = this.formGroup.get('countryId')?.value;
    
    if (!regionId || !countryId) return true;
  
    const selectedRegion = this.regions.find(region => region.id == regionId);
    if (!selectedRegion) return false;

    if (selectedRegion.countryId != countryId) {
      this.toastService.showToast(
        'La región seleccionada no pertenece al país seleccionado', 
        ToastType.WARNING
      );
      this.formGroup.get('regionId')?.setValue('');
      return false;
    }
  
    return true;
  }

  private validateExpiryDate(): boolean {
    const expiryValue = this.formGroup.get('expiry')?.value;
    if (!expiryValue) return false;
  
    const expiryDate = new Date(expiryValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (expiryDate < today) {
      this.toastService.showToast('La fecha de expiración ya ha pasado.', ToastType.WARNING);
      return false;
    }
  
    return true;
  }

  // Manejo del envío del formulario
  onSubmit(): void {
    const allFields = [...this.userFields, ...this.paymentFields].map(field => field.formControlName);
    
    if (!this.validateRequiredFields(allFields)) return;
    if (!this.validateExpiryDate()) return;

    const userData = this.mapFormToUserData();
    this.createUser(userData);
  }

  private createUser(userData: CreateUserRequestDto): void {
    this.userService.createUser(userData).subscribe({
      next: () => this.handleUserCreationSuccess(),
      error: this.handleUserCreationError
    });
  }

  private handleUserCreationSuccess(): void {
    this.toastService.showToast('¡Usuario creado exitosamente!', ToastType.SUCCESS);
    this.formGroup.reset();
    this.currentStep = FormSteps.ROLE_SELECTION;
  }

  private handleUserCreationError = (error: any): void => {
    console.error('Error al crear usuario:', error);
    this.toastService.showToast('Error al crear usuario. Por favor intente nuevamente.', ToastType.ERROR);
  }

  // Métodos de ayuda
  private findFieldByName(fields: Field[], name: string): Field | undefined {
    return fields.find(field => field.formControlName === name);
  }

  private showValidationErrors(fieldNames: string[]): void {
    const messages = fieldNames.map(fieldName => {
      const control = this.formGroup.get(fieldName);
      const field = [...this.userFields, ...this.paymentFields].find(f => f.formControlName === fieldName);
      const fieldLabel = field?.nameLabel || fieldName;
      
      if (control?.errors?.['required']) return `${fieldLabel} es requerido.`;
      if (control?.errors?.['email']) return `Formato de email inválido.`;
      if (control?.errors?.['maxlength']) return `${fieldLabel} excede la longitud máxima.`;
      return `${fieldLabel} es inválido.`;
    });

    this.toastService.showToast(messages.join(' '), ToastType.WARNING);
  }

  private mapFormToUserData(): CreateUserRequestDto {
    const formData = this.formGroup.value;
    
    const paymentMethod: PaymentMethodRequestDto = {
      paymentType: formData.paymentTypeId,
      paymentProvider: formData.paymentProviderType,
      cardNumber: formData.accountNo,
      expirationDate: this.toISOFormat(formData.expiry)
    };
  
    return {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      birthdate: this.toISOFormat(formData.birthdate),
      countryId: formData.countryId,
      regionId: formData.regionId,
      paymentMethods: [paymentMethod],
      roleId: this.roleId
    };
  }

  private toISOFormat(date: string | Date): string {
    if (!date) return "";
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return parsedDate.toISOString();
  }
}