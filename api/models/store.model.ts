import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { StoreDocument } from "@shared/store.document";
import { User } from "./user.model";
import { Billboard } from "./billboard.model";
@Entity()
class Store implements StoreDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.id)
  owner!: User;

  @OneToMany(() => Billboard, (billboard) => billboard.id)
  billboards!: Billboard[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Store };
