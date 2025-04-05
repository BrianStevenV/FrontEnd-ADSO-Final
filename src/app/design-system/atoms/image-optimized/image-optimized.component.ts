// import { NgOptimizedImage } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import { ImageOptimizedProps } from '../../../shared/types/types-prop-design-system/atoms/ImageOptimizedProps.type';

// @Component({
//   selector: 'app-image-optimized',
//   imports: [NgOptimizedImage],
//   template: `<img [ngSrc]="props.imagePath" width="{{props.width}}" height="{{props.height}}"/>`,
//   styleUrl: './image-optimized.component.scss'
// })
// export class ImageOptimizedComponent {

//   @Input() props !: ImageOptimizedProps;
// }

import { NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ImageOptimizedProps } from '../../../shared/types/types-prop-design-system/atoms/ImageOptimizedProps.type';

@Component({
  selector: 'app-image-optimized',
  imports: [NgOptimizedImage],
  template: `
    <img 
      [ngSrc]="props.imagePath" 
      [width]="numericWidth" 
      [height]="numericHeight"
      [style.width]="props.width"
      [style.height]="props.height"
    />
  `,
  styleUrl: './image-optimized.component.scss'
})
export class ImageOptimizedComponent implements OnInit {
  @Input() props!: ImageOptimizedProps;

  numericWidth!: number;
  numericHeight!: number;

  ngOnInit() {
    this.numericWidth = this.extractNumericValue(this.props.width);
    this.numericHeight = this.extractNumericValue(this.props.height);
  }

  private extractNumericValue(value: any): number {
    const num = parseFloat(value); 
    return isNaN(num) ? 100 : num;  
  }
}
