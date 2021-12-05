import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Tags } from "./Tag";
import { v4 as uuid } from "uuid";

@Entity("compliments")
class Compliments {
  @PrimaryColumn()
  readonly id;

  @Column()
  user_sender: string;

  @JoinColumn({ name: "user_sender" })
  //posso ter muito comentarios para um usuario
  @ManyToMany(() => User)
  userSender: User;

  @Column()
  user_receiver: string;

  //usando joinColumn  vai retornar todos os campos do usuario que recebeu o elogio
  @JoinColumn({ name: "user_receiver" })
  @ManyToMany(() => User)
  userReceiver: User;

  @Column()
  tag_id: string;

  @JoinColumn({ name: "tag_id" })
  @ManyToMany(() => Tags)
  tagId: Tags;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default new Compliments();
