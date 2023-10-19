import { Controller, Get, Injectable, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
@Injectable()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get('/new-products')
  async getNewProducts() {
    return await this.productsService.getNewProducts();
  }

  @Get('/trending')
  async getTrendingProducts() {
    return await this.productsService.getTrendingProducts();
  }

  @Get('/categories')
  async getCategories() {
    return await this.productsService.getCategories();
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    return await this.productsService.showProduct(id);
  }

  @Get('/category/:categoryId?')
  async getProductsByCategory(
    @Param('categoryId') categoryId: string,
    @Query('page') page: string,
  ) {
    return await this.productsService.getProductsByCategory({
      categoryId,
      page,
    });
  }
}
