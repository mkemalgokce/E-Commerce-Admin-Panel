import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { ProductDocument } from "shared/product.document";
import { Store } from "./store.model";
import { Size } from "./size.model";
import { Color } from "./color.model";
import { Category } from "./category.model";

@Entity()
class Product implements ProductDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: string;

  @OneToOne(() => Size, (size) => size.id)
  @JoinColumn({ name: "sizeId", referencedColumnName: "id" })
  size!: Size;

  sizeId!: string;

  @OneToOne(() => Color, (color) => color.id)
  @JoinColumn({ name: "colorId", referencedColumnName: "id" })
  color!: Color;

  colorId!: string;
  @OneToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: "categoryId", referencedColumnName: "id" })
  category!: Category;

  categoryId!: string;
  @ManyToOne(() => Store, (store) => store.id)
  store!: Store;

  @Column()
  isArchived!: boolean;

  @Column()
  isFeatured!: boolean;

  @Column({
    type: "simple-array",
  })
  imageUrls!: string[];
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Product };
