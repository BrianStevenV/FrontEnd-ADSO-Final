import { Component, Input } from '@angular/core';
import { ImageOptimizedComponent } from "../../atoms/image-optimized/image-optimized.component";
import { FigureWithContentProps } from '../../../shared/types/types-prop-design-system/organisms/FigureWithContent.type';

@Component({
  selector: 'app-figure-with-content',
  imports: [ImageOptimizedComponent],
  template: `
  <figure>
      <app-image-optimized 
        [props]="props.image"
      />
      <figcaption>
        <ng-content></ng-content>
      </figcaption>
  </figure>
  `,
  styleUrl: './figure-with-content.component.scss'
})
export class FigureWithContentComponent {

  @Input() props !: FigureWithContentProps;
}
