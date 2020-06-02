import { ProductImage } from './product-image.model';

export interface Product {
    id: number;
    title: string;
    price: number;
    available: boolean;
    category: string;
    imageUrl?: string;
    images?: ProductImage[];
}