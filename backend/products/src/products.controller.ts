import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { filter } from 'rxjs';
import { Category } from './entities/category.entity';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'getAllProducts' })
  async index() {
    return await this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'showProduct' })
  async show(id: number) {
    return await this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: 'findByIds' })
  async findByIds(productsId: string[]) {
    return await this.productsService.findByIds(productsId);
  }

  @MessagePattern({ cmd: 'getNewProducts' })
  async getNewProducts() {
    return await this.productsService.getNewProducts();
  }

  @MessagePattern({ cmd: 'getTrendingProducts' })
  async getTrendingProducts() {
    return await this.productsService.getTrendingProducts();
  }

  @MessagePattern({ cmd: 'getProductsByCategory' })
  async getProductsByCategory(filters: { categoryId: string; page: string }) {
    return await this.productsService.getProductsByCategory(filters);
  }

  @MessagePattern({ cmd: 'getCategories' })
  async getCategories(): Promise<Category[]> {
    return await this.productsService.getCategories();
  }
}
