import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { SizeDocument } from "shared/size.document";
import { Store } from "./store.model";
@Entity()
class Size implements SizeDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  value!: string;

  @ManyToOne(() => Store, (store) => store.id)
  store!: Store;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Size };
