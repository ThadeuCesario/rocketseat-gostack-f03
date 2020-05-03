/**
 * Router é um módulo de rotas do express. Isolando os arquivos de rotas do nosso
 * app principal.
 * Temos todos os requests que já conheçemos. GET, POST, PUT, DELETE.
 *
 * routes.use('/appointments', appointmentsRouter);  -> Basicamente qualquer request
 * que gerado (independente se for GET, POST, PUT, DELETE).
 * Será repassado para dentro do appointmentsRouter; Portanto em nosso arquivo
 * appointments.routes.ts, independete da requisição sempre utilizaremos barra.
 *
 */

import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/appointments', appointmentsRouter);

export default routes;
