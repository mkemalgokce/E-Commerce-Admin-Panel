import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { CategoryDocument } from "../../shared/category.document";
import { Store } from "./store.model";

import { Billboard } from "./billboard.model";

@Entity()
class Category implements CategoryDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Store, (store) => store.id)
  store!: Store;

  @ManyToOne(() => Billboard, (billboard) => billboard.id)
  billboard!: Billboard;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Category };
