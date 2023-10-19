import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';

import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(
    @Inject('PRODUCTS_SERVICE')
    private readonly productsClient: ClientProxy,
    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,
    @InjectRepository(Order) private orderssRepository: Repository<Order>,
  ) {}

  async purchase(idUser: number, productsToBuy) {
    const productsId: Array<number> = [];
    productsToBuy.forEach((product) => {
      productsId.push(product.id);
    });

    let user: User = await lastValueFrom(
      this.usersClient.send({ cmd: 'userId' }, idUser).pipe(map((res) => res)),
    );

    let productsDb: Product[] = await lastValueFrom(
      this.productsClient
        .send({ cmd: 'findByIds' }, productsId)
        .pipe(map((res) => res)),
    );

    if (productsDb.length == 0) {
      return new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No se encontraron productos en la orden',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const joinProductWithQuantity = [];
    productsDb.forEach((product) => {
      const matched = productsToBuy.find(
        (productToBuy) => productToBuy.id == product.id,
      );
      if (matched) {
        joinProductWithQuantity.push({ ...product, ...matched });
      }
    });

    let total = 0;
    const items: Item[] = [];
    for (let i = 0; i < productsDb.length; i++) {
      const quantity = productsToBuy[i].quantity;
      const item = new Item();
      item.setQuantity(quantity);
      item.setPrice(productsDb[i].price);
      item.setProduct(productsDb[i]);
      items.push(item);
      total = total + productsDb[i].price * quantity;
    }

    const newOrder = new Order();
    newOrder.setTotal(total);
    newOrder.setItems(items);
    newOrder.setUser(user);

    await this.orderssRepository.save(newOrder);
    const newBalance = user.balance - total;

    await lastValueFrom(
      this.usersClient
        .send({ cmd: 'updateBalance' }, { id: user.id, newBalance })
        .pipe(map((res) => res)),
    );

    return new HttpException(
      {
        status: HttpStatus.CREATED,
        message: 'Orden creada con exito',
      },
      HttpStatus.CREATED,
    );
  }
}
