import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserDocument } from "shared/user.document";
import { Store } from "./store.model";

@Entity()
class User implements UserDocument {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  profilePicture!: string;

  @Column()
  password!: string;

  @Column()
  salt!: string;

  @Column({
    type: "simple-array",
    nullable: true,
  })
  refreshToken!: string[];

  @OneToMany(() => Store, (store) => store.owner)
  store!: Store[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { User };
