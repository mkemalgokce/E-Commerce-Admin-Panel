import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BillboardDocument } from "@shared/billboard.document";
import { Store } from "./store.model";
import { Category } from "./category.model";

@Entity()
class Billboard implements BillboardDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Store, (store) => store.id)
  store!: Store;

  @OneToMany(() => Category, (category) => category.id)
  categories!: Category[];

  @Column({ nullable: true })
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Billboard };
