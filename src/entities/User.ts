import { Entity } from "typeorm";
//para criar entidades no banco de dados
// yarn  typeorm entity:create -n User
//para remover a migration do banco de dados
// yarn typeorm migration:revert
@Entity()
class User {}

export { User };
