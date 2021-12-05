import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createCompliments1638662781485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "compliments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_sender",
            type: "uuid",
          },
          {
            name: "user_receiver",
            type: "uuid",
          },
          {
            name: "tag_id",
            type: "uuid",
          },
          {
            name: "message",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        //dessa maneira se eu fizer droop table nessa tabela
        //toda minhas foreing keys vao ser deletadas
        foreignKeys: [
          {
            //nome da minha Fk
            name: "FKUserSenderCompliments",
            //nome da coluna da tabela de origem
            columnNames: ["user_sender"],
            //nome da tabela de destino
            referencedTableName: "users",
            //nome da coluna da tabela de destino
            referencedColumnNames: ["id"],
            //cascade ou não
            //oque vai ocorrer se meu campo id for atualizado ou deletado
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKUserReceiverCompliments",
            //nome da coluna da tabela de origem
            columnNames: ["user_receiver"],
            //nome da tabela de destino
            referencedTableName: "users",
            //nome da coluna da tabela de destino
            referencedColumnNames: ["id"],
            //cascade ou não
            //oque vai ocorrer se meu campo id for atualizado ou deletado
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKTagIdCompliments",
            columnNames: ["tag_id"],
            referencedTableName: "tags",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );

    //se eu fizer dessa maneira se fizer migration revert,precisaria no dow remover tambem o
    //foreing key
    // await queryRunner.createForeignKey(
    //   "compliments",
    //   new TableForeignKey({
    //     name: "FKUserSenderCompliments",

    //     //nome da minha Fk
    //     //nome da coluna da tabela de origem
    //     columnNames: ["user_sender"],
    //     //nome da tabela de destino
    //     referencedTableName: "users",
    //     //nome da coluna da tabela de destino
    //     referencedColumnNames: ["id"],
    //     //cascade ou não
    //     //oque vai ocorrer se meu campo id for atualizado ou deletado
    //     onDelete: "SET NULL",
    //     onUpdate: "SET NULL",
    //   })
    // );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("compliments");
  }
}
