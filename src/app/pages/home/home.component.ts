import { Component, inject, OnInit, signal } from '@angular/core';
import { BannerComponent } from "../../design-system/organisms/banner/banner.component";
import { TitleH1Component } from "../../design-system/atoms/title-h1/title-h1.component";
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../../design-system/organisms/card-product/card-product.component';
import { ProductResponse } from "../../shared/models/product.model";
import { ProductService } from '../../shared/services/product/product.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { BannerProps } from '../../shared/types/types-prop-design-system/organisms/BannerProps.type';
import { CardProductProps } from '../../shared/types/types-prop-design-system/organisms/CardProductProps.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, TitleH1Component, CommonModule, CardProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  
  imagePath = '/assets/login.png'
  cardProductImageDimension = '200px';
  subtitle = 'Featured Products';
  productsList = signal<CardProductProps[]>([]);

  currentPage!:number;
  totalItems!: number;
  itemsPerPage !: number;

  products!: ProductResponse[];

  bannerProps: BannerProps = {
    title: 'Professional Audiovisual Products',
    description: 'Discover our selection of high-quality equipment for your creative projects',
    image: {
      imagePath: '/assets/banner.jpg',
      width: '50rem',  
      height: '300px'
    }
  };
  


  productService = inject(ProductService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.productService.getFeedHomeProducts().pipe(
      tap((response) => {
        this.totalItems = response.totalElements;
        this.itemsPerPage = response.pageSize;
        this.products = response.content;
        console.log(`this is products ${this.products}`);
        const productsMappers: CardProductProps[] = this.products.map((product) => ({
          productId: product.id, 
          title: product.title, 
          image: {
            imagePath: this.imagePath, 
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
        
        return of([]);
      })
    ).subscribe();
  }

  

  navigate(productId: number): void {
    this.router.navigate(['product/details/', productId]);
  }

}
