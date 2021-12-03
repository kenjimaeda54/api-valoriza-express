import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
//para criar entidades no banco de dados
// yarn  typeorm entity:create -n User
//para remover a migration do banco de dados
// yarn typeorm migration:revert
@Entity()
class User {
  @PrimaryColumn()
  //permito outras classes nao modificarem o id
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    //vou verificar se a minha classe tem um id, se não tiver ele vai criar um id
    //constructor acesso a classe user e vai verificar se tem um id, se não tiver ele vai criar um id
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
