import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CratController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.TCP,
        options: { port: 4004 },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { port: 4003 },
      },
    ]),
  ],
  controllers: [CratController],
  providers: [CartService],
})
export class CartModule {}
