import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { ColorDocument } from "../../shared/color.document";
import { Store } from "./store.model";

@Entity()
class Color implements ColorDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  hexCode!: string;

  @ManyToOne(() => Store, (store) => store.id)
  store!: Store;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Color };
