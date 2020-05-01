/**
 * Esse arquivo será responsável pela conexão com o banco de dados.
 *
 * Primeiramente importamos dentro de 'typeorm' o createConnection.
 * Basta chamar esse createConnection(); que ele irá varrer toda a pasta
 * procurando pelo arquivo ormconfig.json.
 * Se ele encontrar automaticamente ele fará a leitura e importação do banco de
 * dados.
 */

import { createConnection } from 'typeorm';

createConnection();
