import { Product } from "./product.model";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { OrderItemDocument } from "@shared/order.document";
import { Order } from "./order.model";

@Entity()
class OrderItem implements OrderItemDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "productId", referencedColumnName: "id" })
  product!: Product;

  @OneToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: "orderId", referencedColumnName: "id" })
  order!: Order;

  @Column()
  orderId!: string;

  @Column()
  productId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { OrderItem };
