import { ButtonProps } from "../atoms/ButtonProps.type";
import { ImageOptimizedProps } from "../atoms/ImageOptimizedProps.type";

export interface CardProductProps {
    productId: number;
    title: string;
    image: ImageOptimizedProps;
    price: number;
    button: ButtonProps;
  }
  