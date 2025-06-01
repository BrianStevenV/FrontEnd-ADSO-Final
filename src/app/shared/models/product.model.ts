import { Category } from "./category.model";

export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    amountAboutInventory: number;
    attributes: ProductAttributeRequest[];
}
export interface ProductResponse{
    id: number;
    title: string;
    description: string;
    price: number;
    category: Category;
    attributes: ProductAttributeResponse[];
    userProviderId: number;
}

export interface  ProductAttributeResponse {
    id: number;
    valueAttribute: string;
}


export interface DefinitionAttributeResponse {
    id: number;
    nameAttribute: string;
    typeDataOfValueAttribute: string;
}

export interface ProductAttributeRequest {
    definitionAttributeId: number;
    valueAttribute: string;
}


export interface DashboardProductInventory {
    id: number;
    product: string;
    price: number;
    stock: number;
    openDate: string;
    lastModified: string | null;
    category: string;
    status: boolean;
}

export interface AddStockQuantityRequestDto{
    productId: number;
    quantity: number;
}

// export interface valueAttribute {
//     id: number;
//     valueAttribute: string;
// }

export interface DefinitionAttributeRequestDto {
    name: string;
    type: string;
    categoryId: number[]
}