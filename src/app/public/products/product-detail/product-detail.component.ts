import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services';
import { Product } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	product: Product;
	selectedImage: String;
	selectedImageIndex = 0;

	constructor(private productService: ProductService,
				private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.productService.getByID(this.route.snapshot.paramMap.get("id"))
			.subscribe(product => {
				this.product = product;
				this.selectedImage = this.imageDirectory(this.product.images[this.selectedImageIndex].url);
			});
	}

	imageDirectory(url: String): String {
		return environment.imageUrl+'/products/'+url+'/lg_'+url+'.jpg';
	}

	changeSelectedImage(index): void {
		this.selectedImage = this.imageDirectory(this.product.images[index].url);
		this.selectedImageIndex = index;
	}
}