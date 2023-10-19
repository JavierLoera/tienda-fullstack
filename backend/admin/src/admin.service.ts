import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }
  createOrUpdate(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<boolean> {
    return await this.productsRepository
      .delete(id)
      .then((res) => (res.affected == 1 ? true : false));
  }

  async getCategories(categoriesIds: string) {
    const categories = await this.categoryRepository.findBy({
      id: In(JSON.parse(categoriesIds)),
    });
    return categories;
  }

  async getProductsRelationaded(productsRelationaded: string) {
    const products = await this.productsRepository.findBy({
      id: In(JSON.parse(productsRelationaded)),
    });
    return products;
  }
}
