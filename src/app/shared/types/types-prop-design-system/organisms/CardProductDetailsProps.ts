import { ProductAttributeResponse } from "../../../models/product.model";
import { ImageOptimizedProps } from "../atoms/ImageOptimizedProps.type";

export interface CardProductDetailsProps {
    image: ImageOptimizedProps;
    productId: number;
    title: string;
    price: number;
    description: string;
    productAttributes: ProductAttributeResponse[];
}