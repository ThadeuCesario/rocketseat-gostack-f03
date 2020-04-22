import { Router } from 'express';
import appointmentsRouter from './appoinments.routes';

const routes = Router();

/**
 * Utilizando o método 'use' garantirá que toda rota que inicie com '/appointments'
 * independente se for GET, PUT, POST, DELETE... Quando usamos o 'use' ele funciona
 * para qualquer tipo de rota.
 * Vamos repassar o que veio do primeiro parametro para o segundo parâmetro.
 */
routes.use('/appointments', appointmentsRouter);

export default routes;
