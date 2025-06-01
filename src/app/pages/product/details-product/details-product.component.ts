import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, catchError, takeUntil } from 'rxjs';
import { Subject, of } from 'rxjs';
import { ProductService } from '../../../shared/services/product/product.service';
import { ProductAttributeResponse, ProductResponse } from '../../../shared/models/product.model';
import { CardProductComponent } from "../../../design-system/organisms/card-product/card-product.component";
import { CardProductDetailsComponent } from "../../../design-system/organisms/card-product-details/card-product-details.component";
import { CardProductDetailsProps } from '../../../shared/types/types-prop-design-system/organisms/CardProductDetailsProps';
import { CommonModule } from '@angular/common';
import { CardProductProps } from '../../../shared/types/types-prop-design-system/organisms/CardProductProps.type';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [CardProductComponent, CardProductDetailsComponent, CommonModule],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.scss'
})
export class DetailsProductComponent implements OnInit, OnDestroy {

  private readonly productService = inject(ProductService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  
  productId!: number | null;
  productResponse!: ProductResponse | null;
  cardProductDetails!: CardProductDetailsProps;
  productAttributes!: ProductAttributeResponse[];
  
  imagePath = '/assets/login.png';

   productsList = signal<CardProductProps[]>([]);
   products!: ProductResponse[];

   currentPage!:number;
   totalItems!: number;
   itemsPerPage !: number;
  
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadProductDetails();
    this.loadOtherProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProductDetails(): void {
    this.activatedRoute.params.pipe(
      tap(params => {
        this.productId = +params['id'];
        console.log('Product ID from route:', this.productId);
      }),
      switchMap(params => {
        const id = +params['id'];
        if (isNaN(id)) {
          console.error('Invalid product ID in route.');
          return of(null);
        }
        return this.productService.getProductDetails(id);
      }),
      tap(product => {
        this.productResponse = product;
        console.log('Product details:', this.productResponse);
        this.cardProductDetails = {
          image: {
            imagePath: this.imagePath,
            width: 300,
            height: 300
          },
          productId: this.productResponse?.id || 0,
          title: this.productResponse?.title || 'Product Title',
          price: this.productResponse?.price || 0,
          description: this.productResponse?.description || 'Product Description',
          productAttributes: this.productResponse?.attributes || []
        };
        this.productAttributes = this.productResponse?.attributes || []; // Asigna los atributos al array
        console.log('Product attributes:', this.productAttributes);
      }),
      catchError(error => {
        console.error('Error fetching product details:', error);
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  loadOtherProducts(): void {
    this.productService.getFeedHomeProducts().pipe(
      tap((response) => {
        this.totalItems = response.totalElements;
        this.itemsPerPage = response.pageSize;
        this.products = response.content; // All products from the API

        console.log(`Total products loaded: ${this.products.length}`);

        // --- Randomly select 5 products ---
        const shuffledProducts = this.shuffleArray([...this.products]); // Shuffle a copy
        const selectedProducts = shuffledProducts.slice(0, 5); // Take the first 5 after shuffling

        console.log(`Selected 5 random products:`, selectedProducts);

        const productsMappers: CardProductProps[] = selectedProducts.map((product) => ({
          productId: product.id,
          title: product.title,
          image: {
            imagePath: this.imagePath, // Using the fixed imagePath as in your original code
            width: '200px',
            height: '200px'
          },
          price: product.price,
          button: {
            buttonName: 'View Details',
            buttonType: 'button',
            onClick: () => this.navigate(product.id),
          }
        }));
        this.productsList.set(productsMappers);
      }),
      catchError((error) => {
        console.error('Error loading products:', error);
        // Handle error gracefully, e.g., show a message to the user
        return of([]); // Return an empty observable to complete the stream
      })
    ).subscribe();
  }

  /**
   * Shuffles an array randomly using the Fisher-Yates (Knuth) algorithm.
   * @param array The array to shuffle.
   * @returns A new shuffled array.
   */
  private shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  navigate(productId: number): void {
    this.router.navigate(['product/details/', productId]);
  }
}