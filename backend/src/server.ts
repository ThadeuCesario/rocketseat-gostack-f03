/**
 * Estamos utilizando o 'ts-node-dev' no projeto. Estamos executando um projeto
 * com TypeScript e Node. O 'ts-node-dev' tem um bom funcionamento e fornece
 * uma ótima experiência de desenvolvimento.
 * Eu criei dentro do package.json um script para executar o 'ts-node-dev'.
 * Passei duas propriedades para o script também, a primeira é o transpileOnly que
 * passará a não verificar se há erros em nosso código. E a segunda é a ignore-watch node_modules
 * para que a pasta node_modules seja ignorada.
 *
 * EditorConfig -> Ferramenta responsável por padronizar configurações entre diferentes
 * editores de código.
 *
 * ESLint -> Irá nos auxiliar a automatizar os padrões de código em nosso projeto.
 * Após a configuração do ESLint é necessário acessar o settings.json e colocar
 * as configurações para que a correção do ESLint seja aplicada automaticamente
 * após o código ser salvo.
 *
 * Estamos utilizando um plugin do ESLint que se chama.
 * 'eslint-import-resolver-typescript', que será responsável de habilitar para o código
 * entender as importações de arquivos typescript;
 */

import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

app.listen(3333, () => {
  console.log('Server back-end started!');
});
