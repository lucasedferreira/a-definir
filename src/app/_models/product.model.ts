import { ProductImage } from './product-image.model';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    available: boolean;
    categoryID: number;
    images?: ProductImage[];
}