import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 25, unique: true, nullable: false })
  username: string;

  @Field()
  @Column("text", { nullable: false })
  email: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column("text", { nullable: false })
  password: string;

  @Column("text", { nullable: true })
  stripeId?: string;

  @Field()
  @Column("text", { default: "free-trial" })
  type: string;
}
