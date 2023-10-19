import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      relations: {
        categories: true,
        productsRelationated: true,
      },
      where: { id },
    });
    product.views += 1;
    this.productsRepository.save(product);
    return product;
  }

  findByIds(ids: string[]): Promise<Product[]> {
    return this.productsRepository.findBy({ id: In(ids) });
  }

  async getNewProducts(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: {
        categories: true,
      },
      take: 8,
      order: {
        id: 'DESC',
      },
    });
  }

  async getTrendingProducts(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: {
        categories: true,
      },
      take: 10,
      order: {
        views: 'DESC',
      },
    });
  }

  async getProductsByCategory(filters: {
    categoryId: string;
    page: string;
  }): Promise<any> {
    const perPage = 10;
    const skip = perPage * Number(filters.page) - perPage;

    const queryBuilder = await this.productsRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.categories', 'category')
      .take(perPage)
      .skip(skip);

    if (Number(filters.categoryId)) {
      queryBuilder.where('category.id = :id', { id: filters.categoryId });
    }

    const [entities, totalCount] = await queryBuilder.getManyAndCount();

    return { products: entities, total: totalCount };
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
