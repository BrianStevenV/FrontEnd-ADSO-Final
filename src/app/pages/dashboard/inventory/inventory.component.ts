
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../design-system/atoms/button/button.component';
import { TableComponent } from '../../../design-system/organisms/table/table.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product/product.service';
import { AddStockQuantityRequestDto, DashboardProductInventory } from '../../../shared/models/product.model';
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { Router } from '@angular/router';
import { ModalComponent } from "../../../design-system/molecules/modal/modal.component";
import { Validators } from '@angular/forms';
import { Category } from '../../../shared/models/category.model';

@Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [ButtonComponent, TableComponent, CommonModule, ModalComponent],
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {

    private router = inject(Router);
    private productService = inject(ProductService);
    private changeDetectorRef = inject(ChangeDetectorRef);

    headers = ['ID', 'Product', 'Price', 'Stock', 'Open Date', 'Last Modified', 'Category', 'Status'];
    keys = ['id', 'productName', 'price', 'quantity', 'openDateAt', 'lastModifiedAt', 'categoryName', 'isActive'];

    modalVisible = false;
    modalTitle = '';
    closeButtonNameModal = 'Back';
    submitButtonNameModal = 'Submit';
    modalFormFields: { name: string, label: string, type: string, validators: any[], maxLength: number }[] = [];

    modalMode: 'addStock' | 'disableProduct' | 'addProductAttribute' |null = null;

    currentPage!: number;
    totalItems!: number;
    itemsPerPage!: number;
    dataToDashboard!: DashboardProductInventory[];

    categories!: Category[];

    addBtnProps: ButtonProps = {
        buttonName: 'Add Product',
        buttonType: 'button',
        onClick: () => this.onAddProduct()
    };

    disableBtnProps: ButtonProps = {
        buttonName: 'Disable Product',
        buttonType: 'button',
        onClick: () => this.openDisableProductModal()
    };

    updateBtnProps: ButtonProps = {
        buttonName: 'Update Product',
        buttonType: 'button',
        onClick: () => this.onUpdateProduct()
    };

    addStockBtnProps: ButtonProps = {
        buttonName: 'Add Stock',
        buttonType: 'button',
        onClick: () => this.openAddStockModal()
    };

    addProductAttributeBtnProps: ButtonProps = {
        buttonName: 'Add Product Attribute',
        buttonType: 'button',
        onClick: () => this.openAddProductAttributeModal()
    }

    ngOnInit(): void {
        this.loadInitialData();
    }

    private loadInitialData(): void {
        this.getAllProductsByProvider();
    }

    private loadInitialCategoriesData(): void {
        this.getAllCategories();
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
    console.log("Categories loaded:", this.categories);
  }

  private updateCategoryOptions(): void {
    const categoryField = this.findFieldByName(this.modalFormFields, 'categoryId');
    if(categoryField) {
      categoryField.options = this.categories.map(category => ({
        value: category.id,
        label: category.title
      }));
    }
  }

  private findFieldByName(fields: any[], name: string) {
      return fields.find(field => field.formControlName === name);
    }

    private getAllProductsByProvider(): void {
        this.productService.getDashboarProductsByUserProvider().subscribe({
            next: (response) => {
                this.totalItems = response.totalElements;
                this.itemsPerPage = response.pageSize;
                this.dataToDashboard = response.content;
            },
            error: (error) => {
                console.error('Error fetching products:', error);
            }
        });
    }

    private onAddProduct(): void {
        this.router.navigate(['/add-product']);
    }

    private onDisableProduct(productId: number): void {
        this.productService.postDisableProduct(productId).subscribe({
            next: (response) => {
                console.log('Product disabled successfully:', response);
                this.closeModal();
                this.loadInitialData();
            },
            error: (error) => {
                console.error('Error disabling product:', error);
            }
        });
    }

    private onUpdateProduct(): void {
        console.log('Update Product button clicked');
    }

    private onAddStock(addStock: AddStockQuantityRequestDto): void {
        this.productService.patchProductQuantityStock(addStock).subscribe({
            next: (response) => {
                console.log('Stock updated successfully:', response);
                this.closeModal();
                this.loadInitialData();
            },
            error: (error) => {
                console.error('Error updating stock:', error);
            }
        });
    }

    openAddProductAttributeModal(): void {
       this.router.navigate(['/definition-attribute']);
    }

    openAddStockModal(): void {
        this.modalMode = 'addStock';
        this.modalTitle = 'Add Product Quantity';
        this.modalFormFields = [
            {
                name: 'productId',
                label: 'Product ID',
                type: 'number',
                validators: [Validators.required],
                maxLength: 10
            },
            {
                name: 'quantity',
                label: 'Quantity',
                type: 'number',
                validators: [Validators.required, Validators.max(10000)],
                maxLength: 5
            }
        ];
        this.modalFormFields = [...this.modalFormFields];
        this.modalVisible = true;
        this.changeDetectorRef.detectChanges();
    }

    openDisableProductModal(): void {
        this.modalMode = 'disableProduct';
        this.modalTitle = 'Disable Product';
        this.modalFormFields = [
            {
                name: 'productId',
                label: 'Product ID',
                type: 'number',
                validators: [Validators.required],
                maxLength: 10
            }
        ];
        this.modalVisible = true;
        this.modalFormFields = [...this.modalFormFields];
        this.changeDetectorRef.detectChanges();
    }

    onModalSubmit(formValue: any): void {
        console.log('onModalSubmit in inventory:', formValue); // Add this for debugging
        if (this.modalMode === 'addStock') {
            const dto: AddStockQuantityRequestDto = {
                productId: formValue.productId,
                quantity: formValue.quantity
            };
            console.log('dto: ', dto);
            this.onAddStock(dto);
        } else if (this.modalMode === 'disableProduct') {
            console.log('productId to disable: ', formValue.productId);
            this.onDisableProduct(formValue.productId);
        } else {
            console.warn('No modal mode selected');
        }
    }

    closeModal(): void {
        this.modalVisible = false;
        this.modalMode = null;
    }

    // TODO: Implement Pagination
}
