import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  descriptionCorta: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  size: number;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  views: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Item, (item) => item.product) items: Item[];

  @Column()
  fullImagePath: string;

  setFullImagePath(path: string) {
    this.fullImagePath = process.env.serverBaseUrl + path;
  }

  getItems(): Item[] {
    return this.items;
  }

  @ManyToMany(() => Product)
  @JoinTable()
  productsRelationated: Product[];

  setItems(items: Item[]) {
    this.items = items;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName(): string {
    return this.name.toUpperCase();
  }

  setName(name: string) {
    this.name = name;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getImage(): string {
    return this.image;
  }

  setImage(image: string) {
    this.image = image;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number) {
    this.price = price;
  }

  static sumPricesByQuantities(products: Product[], productsInSession): number {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total =
        total + products[i].getPrice() * productsInSession[products[i].getId()];
    }
    return total;
  }
}
