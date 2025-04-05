import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormSubmitComponent } from '../../../design-system/organisms/form-submit/form-submit.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { CountryService } from '../../../shared/services/user/country/country.service';
import { PaymentInfoService } from '../../../shared/services/user/payment-info/payment-info.service';
import { RegionService } from '../../../shared/services/user/region/region.service';
import { UserService } from '../../../shared/services/user/user.service';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { Field } from '../../../shared/types/types-utils-design-system/FieldProps.type';
import { VALIDATORS_PASSWORD_MAX_LENGTH } from '../../../shared/constants/login.constants';
import { ToastType } from '../../../shared/models/toast.model';
import { Country } from '../../../shared/models/country.model';
import { Region } from '../../../shared/models/region.model';
import { PaymentInfoProviders, PaymentInfoTypes } from '../../../shared/models/payment-info.model';
import { VALIDATORS_PHONE_MAX_LENGTH } from '../../../shared/constants/register.constants';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserResponseDto } from '../../../shared/models/user.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from "../../../design-system/atoms/button/button.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormSubmitComponent, CommonModule, ButtonComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  
  private readonly PHONE_PATTERN = /^\+?\d+$/;

  private formBuilder = inject(FormBuilder);
  private countryService = inject(CountryService);
  private regionService = inject(RegionService);
  private paymentInfoService = inject(PaymentInfoService);
  private toastService = inject(ToastService);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  private isBrowser!: boolean;
  isEditing = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  user!: UserResponseDto;
  countries: Country[] = [];
  regions: Region[] = [];
  paymentTypes: PaymentInfoTypes[] = [];
  paymentProviders: PaymentInfoProviders[] = [];

  displayFields = [
    { key: 'name', label: 'Name' },
    { key: 'surname', label: 'Surname' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'birthdate', label: 'Birthdate' },
    { key: 'country', label: 'Country' },
    { key: 'region', label: 'Region' },
    { key: 'paymentType', label: 'Payment Type' },
    { key: 'paymentProvider', label: 'Payment Provider' },
    { key: 'cardNumber', label: 'Card Number' },
    { key: 'expirationDate', label: 'Expiration Date' }
  ];

  getDisplayValue(key: string): string {
    if (!this.user) return '';
    
    // Direct property access for simple properties
    if (['name', 'surname', 'email', 'phone', 'birthdate', 'cardNumber', 'expirationDate'].includes(key)) {
      return this.user[key as keyof UserResponseDto] as string || '';
    }
    
    // Special handling for nested objects
    if (key === 'country' && this.user.country) {
      return this.user.country.countryName || '';
    }
    if (key === 'region' && this.user.region) {
      return this.user.region.regionName || '';
    }
    if (key === 'paymentType' && this.user.paymentType) {
      return this.user.paymentType.paymentTypeName || '';
    }
    if (key === 'paymentProvider' && this.user.paymentProvider) {
      return this.user.paymentProvider.paymentProviderName || '';
    }

    return '';
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  ngOnInit(): void {
  
    this.initializeForm();
    this.loadInitialData();
  }
  

  private initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH)]],
      phone: ['', [Validators.required, Validators.maxLength(VALIDATORS_PHONE_MAX_LENGTH)]],
      countryId: ['', [Validators.required]],
      regionId: ['', [Validators.required]],
      paymentTypeId: ['', [Validators.required]],
      paymentProviderType: ['', [Validators.required]],
      accountNo: ['', [Validators.required]],
      expiry: ['', [Validators.required]],
    });
  }
  formGroup!: FormGroup;

  submitUserInfoBtn: ButtonProps = {
    buttonName: 'Update',
    buttonType: 'submit',
  };

  backBtn: ButtonProps = {
    buttonName: 'Back',
    buttonType: 'button',
    onClick: () => this.goBack(),
  };

  updateUserInfoBtn: ButtonProps = {
    buttonName: 'Edit User',
    buttonType: 'button',
  };



  userUpdateFields: Field[] = [
    {
      nameLabel: 'Password',
      formControlName: 'password',
      inputType: 'password',
      validators: [
        Validators.required,
        Validators.maxLength(VALIDATORS_PASSWORD_MAX_LENGTH),
      ],
      maxLength: VALIDATORS_PASSWORD_MAX_LENGTH,
    },
    {
      nameLabel: 'Phone',
      formControlName: 'phone',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 15,
    },
    {
      nameLabel: 'Country',
      formControlName: 'countryId',
      inputType: 'select',
      validators: [Validators.required],
      options: [],
    },
    {
      nameLabel: 'Region',
      formControlName: 'regionId',
      inputType: 'select',
      validators: [Validators.required],
      options: [],
    },
    {
      nameLabel: 'Type Payment',
      formControlName: 'paymentTypeId',
      inputType: 'select',
      validators: [Validators.required],
      options: [],
    },
    {
      nameLabel: 'Provider Payment',
      formControlName: 'paymentProviderType',
      inputType: 'select',
      validators: [Validators.required],
      options: [],
    },
    {
      nameLabel: 'Account No.',
      formControlName: 'accountNo',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 20,
    },
    {
      nameLabel: 'Expiry Date',
      formControlName: 'expiry',
      inputType: 'date',
      validators: [Validators.required],
      maxLength: 10,
    },
  ];

  private loadInitialData(): void {

    if(!this.isBrowser){
      console.log(`I'm false isBrowser ${this.isBrowser}`);
      return;
    }

    console.log(`I'm true isBrowser ${this.isBrowser}`);
    const userId = this.authService.userId();

    this.countryService.getAllCountriesInfo().subscribe({
      next: (countries) => this.handleCountriesLoaded(countries),
      error: this.handleDataLoadError,
    });

    this.regionService.getAllRegionsInfo().subscribe({
      next: (regions) => this.handleRegionsLoaded(regions),
      error: this.handleDataLoadError,
    });

    this.paymentInfoService.getAllPaymentInfoTypes().subscribe({
      next: (paymentTypes) => this.handlePaymentTypesLoaded(paymentTypes),
      error: this.handleDataLoadError,
    });

    this.paymentInfoService.getAllPaymentInfoProvider().subscribe({
      next: (paymentProviders) =>
        this.handlePaymentProvidersLoaded(paymentProviders),
      error: this.handleDataLoadError,
    });
    
    this.userService.getUserById(userId).subscribe({
      
      next: (user) => 
        this.handleUserLoaded(user),
      error: this.handleDataLoadError,
    })
    
  }

  private handleUserLoaded(user: any): void {
    this.user = user;
    console.log('User loaded:', user);
    this.initUserData(user);

  }
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

  private handlePaymentProvidersLoaded(
    paymentProviders: PaymentInfoProviders[]
  ): void {
    this.paymentProviders = paymentProviders;
    this.updatePaymentProviderOptions();
  }

  private handleDataLoadError = (error: any): void => {
    console.error('Error loading data:', error);
    this.toastService.showToast(
      'Error loading data. Please try again.',
      ToastType.ERROR
    );
  };

  private initUserData(user: UserResponseDto): void {
    this.formGroup.patchValue({
      password: user.password,
      phone: user.phone,
      countryId: this.test(),
      regionId: user.region.id,
      paymentTypeId: user.paymentType.id,
      paymentProviderType: user.paymentProvider.id,
      accountNo: user.cardNumber,
      expiry: user.expirationDate,
    });

    this.updateCountryOptions();
    this.updateRegionOptions();
    this.updatePaymentTypeOptions();
    this.updatePaymentProviderOptions();

  }

  private test(){
    return this.countries.find(c => c.id == this.user.country.id)?.id || null;
  }
  // Actualización de opciones en campos select
  private updateCountryOptions(): void {
    const countryField = this.findFieldByName(this.userUpdateFields, 'countryId');
    if (countryField) {
      countryField.options = this.countries.map((c) => ({
        value: c.id,
        label: c.countryName,
      }));
    }
  }

  private updateRegionOptions(): void {
    const regionField = this.findFieldByName(this.userUpdateFields, 'regionId');
    if (regionField) {
      regionField.options = this.regions.map((r) => ({
        value: r.id,
        label: r.regionName,
      }));
    }
  }

  private updatePaymentTypeOptions(): void {
    const paymentTypeField = this.findFieldByName(
      this.userUpdateFields,
      'paymentTypeId'
    );
    if (paymentTypeField) {
      paymentTypeField.options = this.paymentTypes.map((p) => ({
        value: p.id,
        label: p.paymentTypeName,
      }));
    }
  }

  private updatePaymentProviderOptions(): void {
    const paymentProviderField = this.findFieldByName(
      this.userUpdateFields,
      'paymentProviderType'
    );
    if (paymentProviderField) {
      paymentProviderField.options = this.paymentProviders.map((p) => ({
        value: p.id,
        label: p.paymentProviderName,
      }));
    }
  }

  private validatePhoneNumber(): boolean {
    const phoneControl = this.formGroup.get('phone');
    if (!phoneControl?.value) return false;

    if (!this.PHONE_PATTERN.test(phoneControl.value)) {
      this.toastService.showToast(
        'Formato de número telefónico inválido.',
        ToastType.WARNING
      );
      return false;
    }

    return true;
  }

  private validateRegionBelongsToCountry(): boolean {
    const regionId = this.formGroup.get('regionId')?.value;
    const countryId = this.formGroup.get('countryId')?.value;

    if (!regionId || !countryId) return true;

    const selectedRegion = this.regions.find((region) => region.id == regionId);
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
      this.toastService.showToast(
        'La fecha de expiración ya ha pasado.',
        ToastType.WARNING
      );
      return false;
    }

    return true;
  }

  private findFieldByName(fields: Field[], name: string): Field | undefined {
    return fields.find((field) => field.formControlName === name);
  }

  private showValidationErrors(fieldNames: string[]): void {
    const messages = fieldNames.map((fieldName) => {
      const control = this.formGroup.get(fieldName);
      const field = [...this.userUpdateFields].find(
        (f) => f.formControlName === fieldName
      );
      const fieldLabel = field?.nameLabel || fieldName;

      if (control?.errors?.['required']) return `${fieldLabel} es requerido.`;
      if (control?.errors?.['maxlength'])
        return `${fieldLabel} excede la longitud máxima.`;
      return `${fieldLabel} es inválido.`;
    });

    this.toastService.showToast(messages.join(' '), ToastType.WARNING);
  }

  goBack(): void {
    this.isEditing = false;
  }

  private updateFieldOptions(controlName: string, options: { value: any; label: string }[]): void {
    const field = this.userUpdateFields.find(f => f.formControlName === controlName);
    if (field) {
      field.options = options;
    }
  }
  
  
}
