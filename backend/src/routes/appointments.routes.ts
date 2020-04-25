/**
 * Precisamos sempre dividir o arquivo de rotas, de acordo com cada entidade de nossa aplicação.
 * Vimos no design do GoBarber que temos um CRUD de agendamentos. Por isso temos um
 * arquivo específico para as rotas de agendamento.
 * Veja que estou utilizando como primeiro parametro do método o caminho '/'
 * isso porque dentro do index.js, já realizei a configuração de que qualquer
 * request com o caminho '/appointments', será redirecionado para esse arquivo.
 *
 * Como ainda não criamos nenhuma persistência em um banco de dados, vamos iniciar
 * armazenando os dados em um array.
 * const appointments = [];
 */

import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const appointment = {
        id: uuid(),
        provider,
        date,
    };

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;
