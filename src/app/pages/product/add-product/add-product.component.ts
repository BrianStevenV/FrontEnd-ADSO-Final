import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product/product.service';
import { FormSubmitComponent } from "../../../design-system/organisms/form-submit/form-submit.component";
import { Field } from '../../../shared/types/types-utils-design-system/FieldProps.type';
import { Category, CategoryAttribute } from '../../../shared/models/category.model';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { CommonModule } from '@angular/common';
import { CreateProductRequest, ProductAttributeRequest } from '../../../shared/models/product.model';
import { ToastType } from '../../../shared/models/toast.model';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE } from '../../../shared/constants/product.constants';
import { Router } from '@angular/router';

enum FormSteps {
  PRODUCT_INFO = 0,
  PRODUCT_ATTRIBUTES = 1
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormSubmitComponent, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

  //TODO: re-use this template in the update product component through *ngIf
  // However, the upate product needs to introduce id product, It doesn't implemented here.
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  private toastService = inject(ToastService);

  categoriesProduct!: Category[]
  categoriesAttributesProduct!: CategoryAttribute[];

  formGroup!: FormGroup;
  currentStep = FormSteps.PRODUCT_INFO;
  categoryId!: number;

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

  nextBtnProps: ButtonProps = { 
      buttonName: 'Next', 
      buttonType: 'button', 
      onClick: () => this.nextStep() 
    };

  backBtnProps: ButtonProps = {
    buttonName: 'Back', 
    buttonType: 'button', 
    onClick: () => this.BackStep() 
  }

  BackStep(): void {
    this.router.navigate(['/dashboard/inventory']);
  }

  prevStep(): void {
    if(this.currentStep === FormSteps.PRODUCT_ATTRIBUTES) {
      this.currentStep = FormSteps.PRODUCT_INFO;
    }
  }

  nextStep(): void {
    if (this.currentStep === FormSteps.PRODUCT_INFO) {
      const categoryId = this.formGroup.get('categoryId')?.value;
    
      this.getAllCategoriesAttributesAccordingToCategory(categoryId);
      this.currentStep = FormSteps.PRODUCT_ATTRIBUTES;
    }
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.initializeForm();
  }

  productFields: Field[] = [
    {
      nameLabel: 'Product Name',
      formControlName: 'productName',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 50,
    },
    {
      nameLabel: 'Product Description',
      formControlName: 'productDescription',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 700,
    },
    {
      nameLabel: 'Price',
      formControlName: 'productPrice',
      inputType: 'number',
      validators: [Validators.required],
      maxLength: 10,
    },
    {
      nameLabel: 'Product Stock',
      formControlName: 'productInventory',
      inputType: 'number',
      validators: [Validators.required],
      maxLength: 10,
    },
    {
      nameLabel: 'Category',
      formControlName: 'categoryId',
      inputType: 'select',
      validators: [Validators.required],
      options: [],
    }
  ]

  attributeProductFields: Field[] = []
  
  private initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.maxLength(50)]],
      productDescription: ['', [Validators.required, Validators.maxLength(700)]],
      productPrice: ['', [Validators.required, Validators.maxLength(10)]],
      productInventory: ['', [Validators.required, Validators.maxLength(10)]],
      categoryId: ['', [Validators.required]],
    });
  }

  private loadInitialData(): void {
    this.getAllCategories();
  }

  createProduct(request: CreateProductRequest): void {
    this.productService.postCreateProduct(request).subscribe({
      next: (response) => {
        const message = response.status === 201 ? 'Product created successfully!' : 'Failed to create product.';
        this.toastService.showToast(message, ToastType.SUCCESS);
      },
      error: (error) => {
        const message = 
        ERROR_MESSAGES_BY_CODE[
          error.status as keyof typeof ERROR_MESSAGES_BY_CODE
        ] || GENERIC_ERROR_MESSAGE;
        this.toastService.showToast(message, ToastType.ERROR);
      }
    })
  }

  private getAllCategories(){
    this.productService.getAllCategories().subscribe({
      next: (categories) => this.handleCategoryLoaded(categories),
      error: (error) => console.error('Error fetching categories:', error),
    });
  }

  private handleCategoryLoaded(categories: Category[]): void {
    this.categoriesProduct = categories;
    this.updateCategoryOptions();
    console.log('Categories:', categories);
  }

  private updateCategoryOptions(): void {
    const categoryField = this.findFieldByName(this.productFields, 'categoryId');
    if(categoryField) {
      categoryField.options = this.categoriesProduct.map(category => ({
        value: category.id,
        label: category.title
      }));
    }
  }

  private findFieldByName(fields: Field[], name: string): Field | undefined {
    return fields.find(field => field.formControlName === name);
  }

  private getAllCategoriesAttributesAccordingToCategory(categoryId: number): void {
    this.productService.getAttributesAccordingToCategory(categoryId).subscribe((attributes) => {
      this.categoriesAttributesProduct = attributes;
      this.buildAttributesForm(attributes); 
      this.currentStep = FormSteps.PRODUCT_ATTRIBUTES;
    });
  }
  
  private buildAttributesForm(attributes: CategoryAttribute[]): void {
    const fields: Field[] = [];

    attributes.forEach(attr => {
      const controlName = attr.definitionAttribute.nameAttribute;

      this.formGroup.addControl(
        controlName,
        this.formBuilder.control('', Validators.required)
      );

      fields.push({
        nameLabel: attr.definitionAttribute.nameAttribute,
        formControlName: controlName,
        inputType: attr.definitionAttribute.typeDataOfValueAttribute === 'number' ? 'number' : 'text',
        maxLength: 150,
        validators: [Validators.required],
      });
    });

    this.attributeProductFields = fields;
  }

  onSubmit(): void {
    const formValues = this.formGroup.value;

    const attributes: ProductAttributeRequest[] = this.categoriesAttributesProduct.map(attr => ({
      definitionAttributeId: attr.definitionAttribute.id,
      valueAttribute: formValues[attr.definitionAttribute.nameAttribute]
    }));

    const request: CreateProductRequest = {
      name: formValues.productName,
      description: formValues.productDescription,
      price: +formValues.productPrice,
      categoryId: +formValues.categoryId,
      amountAboutInventory: +formValues.productInventory,
      attributes: attributes
    };

    
    this.createProduct(request);
    this.router.navigate(['/dashboard/inventory']);
  }

}
