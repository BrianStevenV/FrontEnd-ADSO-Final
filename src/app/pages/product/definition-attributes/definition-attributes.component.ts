import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Category } from '../../../shared/models/category.model';
import { Field } from '../../../shared/types/types-utils-design-system/FieldProps.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefinitionAttributeRequestDto } from '../../../shared/models/product.model';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { ToastType } from '../../../shared/models/toast.model';
import { FormSubmitComponent } from '../../../design-system/organisms/form-submit/form-submit.component';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-definition-attributes',
  standalone: true,
  imports: [FormSubmitComponent],
  templateUrl: './definition-attributes.component.html',
  styleUrl: './definition-attributes.component.scss'
})
export class DefinitionAttributesComponent implements OnInit{

  router = inject(Router);
  productService = inject(ProductService);
  formBuidler = inject(FormBuilder);
  toastService = inject(ToastService);

  formGroup!: FormGroup;
  categories!: Category[];

  ngOnInit(): void {
    this.loadInitialData();
    this.initializeForm();
  }

  loadInitialData(){
    this.getAllCategories();
  }

  definitionAttributesFields: Field[] = [
    {
      nameLabel: 'Name',
      formControlName: 'name',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 50,
    },
    {
      nameLabel: 'Type',
      formControlName: 'type',
      inputType: 'text',
      validators: [Validators.required],
      maxLength: 50,
    },
    {
      nameLabel: 'Category',
      formControlName: 'categoryId',
      inputType: 'select',
      validators: [Validators.required],
      options: [],
    }
  ]

  backBtnProps: ButtonProps = {
      buttonName: 'Back', 
      buttonType: 'button', 
      onClick: () => this.backStep() 
    }
  
  backStep(): void {
    this.router.navigate(['/dashboard/inventory']);
  }

  submitBtnProps: ButtonProps = { 
    buttonName: 'Send', 
    buttonType: 'submit', 
    onClick: () => this.onSubmit() 
  };

  private initializeForm(): void {
    this.formGroup = this.formBuidler.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      categoryId: [[], [Validators.required]]
    })
  }

  private getAllCategories(){
    this.productService.getAllCategories().subscribe({
      next: (categories) => this.handleCategoryLoaded(categories),
      error: (error) => console.error('Error fetching categories:', error),
    });
  }


  private handleCategoryLoaded(categories: Category[]): void {
    this.categories = categories;
    this.updateCategoryOptions();
    console.log('Categories:', categories);
  }

  private updateCategoryOptions(): void {
    const categoryField = this.findFieldByName(this.definitionAttributesFields, 'categoryId');
    if(categoryField) {
      categoryField.options = this.categories.map(category => ({
        value: category.id,
        label: category.title
      }));
    }
  }

  private findFieldByName(fields: Field[], name: string): Field | undefined {
    return fields.find(field => field.formControlName === name);
  }



  onSubmit(){
    const formValues = this.formGroup.value;

    const definitionAttributeRequest = {
      name: formValues.name,
      type: formValues.type,
      categoryId: formValues.categoryId
    }

    this.createDefinitionAttribute(definitionAttributeRequest);
  }


  createDefinitionAttribute(request: DefinitionAttributeRequestDto): void {
    this.productService.postCreateProductAttributes(request).subscribe({
      next: (response) => {
        const message = response.status === 201 ? 'Definition Attribute created successfully!' : 'Failed to create Definition Attribute';
        this.toastService.showToast(message, ToastType.SUCCESS);
        this.formGroup.reset();
        this.router.navigate(['/dashboard/inventory']);
      },
      error: (error) => {
        console.error('Error creating definition attribute:', error);
      }
    })
  }

}
