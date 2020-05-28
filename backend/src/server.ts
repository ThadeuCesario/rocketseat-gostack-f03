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
 *
 * Prettier -> Configurações para melhorar a formatação de nosso código.
 * Conseguimos integrar o prettier com o eslint e aplicar correções automática em nosso código
 *
 *
 * Model -> A representação de como um dado é salvo dentro de nossa aplicação.
 * Repositório -> Responsável por trabalhar com o dado (CRUD)
 * Service -> Reponsável por armazernar a regra de negócio de nossa aplicação.
 */

import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import uploadConfig from './config/upload';
import './database';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(cors());
app.use(routes);

/*
 *O erro acontecerá nas rotas, portanto precisamos realizar a trativas dos errors
 * depois das rotas.
 *
 * Os middlewares para tratativa de erros do express, são obrigados a terem
 * quatro parâmetros. Que são:
 * - error
 * - request
 * - response
 * - next
 */

app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
            /**
             * Se true, é um erro gerado pela minha aplicação, portanto é um erro
             * conhecido.
             */
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        console.error(error);

        return response.status(500).json({
            status: 'error',
            message: 'internal server error',
        });
    },
);

app.listen(3333, () => {
    console.log('Server back-end started!');
});
