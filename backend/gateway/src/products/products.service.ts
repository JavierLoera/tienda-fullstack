import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  async getProducts() {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'getAllProducts' }, {})
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async showProduct(id: number) {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'showProduct' }, id)
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async getNewProducts() {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'getNewProducts' }, {})
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async getTrendingProducts() {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'getTrendingProducts' }, {})
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async getProductsByCategory(filters: { categoryId: string; page: string }) {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'getProductsByCategory' }, filters)
        .pipe(map((res) => res)),
    );

    try {
      return result;
    } catch (error) {
      return error;
    }
  }

  async getCategories() {
    let result = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'getCategories' }, {})
        .pipe(map((res) => res)),
    );
    try {
      return result;
    } catch (error) {
      return error;
    }
  }
}
