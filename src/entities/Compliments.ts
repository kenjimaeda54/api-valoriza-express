import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Tags } from "./Tag";
import { v4 as uuid } from "uuid";

@Entity("compliments")
class Compliments {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_sender: string;

  @JoinColumn({ name: "user_sender" })
  //posso ter muito comentarios para um usuario
  @ManyToOne(() => User)
  userSender: User;

  @Column()
  user_receiver: string;

  //usando joinColumn  vai retornar todos os campos do usuario que recebeu o elogio
  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  userReceiver: User;

  @Column()
  tag_id: string;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tags)
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

export { Compliments };
