import { Component, Input } from '@angular/core';
import { ImageOptimizedComponent } from "../../atoms/image-optimized/image-optimized.component";
import { TitleH1Component } from "../../atoms/title-h1/title-h1.component";
import { BannerProps } from '../../../shared/types/types-prop-design-system/organisms/BannerProps.type';

@Component({
  selector: 'app-banner',
  imports: [ImageOptimizedComponent, TitleH1Component],
  template: `
  <figure class="banner">
  <div class="banner__image">
    <app-image-optimized [props]="props.image"></app-image-optimized>
  </div>
  <figcaption class="banner__content">
    <app-title-h1 class="banner__title" [title]="props.title"></app-title-h1>
    <p class="banner__description">{{ props.description }}</p>
  </figcaption>
</figure>

  `,
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input() props!: BannerProps;
}
