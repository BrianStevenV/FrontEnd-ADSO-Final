import { DefinitionAttributeResponse } from './product.model';
export interface Category {
    id: number;
    title: string;
    description: string;
}

export interface CategoryAttribute {
    id: number;
    categoryId: number | Category;
    definitionAttribute: DefinitionAttributeResponse;
}