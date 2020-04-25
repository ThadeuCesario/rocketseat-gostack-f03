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
 */

import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({message: 'Hello GoStack'});
})

app.listen(3333, () => {
  console.log('Server back-end started!')
});
