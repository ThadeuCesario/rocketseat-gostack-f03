/**
 * Lembrando que sempre que trabalhamos com migrations, preciamos colocar await
 * para garantir que seja assincrono. Caso contrário, poderá ocasionar erros e lentidão
 * da aplicação.
 *
 * Não armazenar imagens direto no banco de dados, mesmo se for convertidas
 * para base 64. Devemos armazenar o caminho da imagem no servidor.
 */

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldToUsers1588721786145
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
