/**
 * O que o Git faz para o código, as migrations faz para os nossos bancos de dados.
 * Controlando as versões de nosso banco de dados e também alterações simultaneas
 * realizadas em nosso banco de dados.
 * Então basicamente ao invés do dev ir la direto no banco de dados e fazer as
 * alterações nele, ele faz as alterações na migration.
 * Quando os outros devs executarem as migrations, será replicado evitando que os
 * bancos de dados estejam de forma diferente.
 *
 * O método up: Colocamos o que desejamos que aconteça com o banco de dados, quando
 * a migration for executada. (Alterações, criação de uma nova tabela.....)
 *
 * O método down: Utilizamos como fallback. Basicamente o método down desfaz o que foi
 * feito no método up em casos de problemas.
 *
 * Só podemos alterar uma migration se ela ainda não foi enviada para o sistema de
 * controle de versão.
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1588376200444
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar', // vamos utilizar aqui o uuid por isso seguiremos com varchar
                        isPrimary: true, // PrimaryKey
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone', // Além do horário, vai gravar o fuso horario
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('appointments');
    }
}
