import { Category } from "./category.model";

export interface ProductResponse{
    id: number;
    title: string;
    description: string;
    price: number;
    category: Category;
    attributes: ValueAttribute[];
    userProviderId: number;
}

export interface  ValueAttribute {
    id: number;
    valueAttribute: string;
}