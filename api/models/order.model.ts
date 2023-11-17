import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { OrderDocument } from "@shared/order.document";
import { OrderItem } from "./orderItem.model";
import { Store } from "./store.model";

@Entity()
class Order implements OrderDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  isPaid!: boolean;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @OneToMany(() => OrderItem, (item) => item.id)
  orderItems!: OrderItem[];

  @ManyToOne(() => Store, (store) => store.id)
  @JoinColumn({ name: "storeId", referencedColumnName: "id" })
  store!: Store;

  @Column()
  storeId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Order };
