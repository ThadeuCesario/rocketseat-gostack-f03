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
 *
 * Estamos utilizando em nosso projeto uma biblioteca chamada data-fns, podemos trabalhar
 * com essa biblioteca tanto no back quanto no front, para lidarmos com datas e horários.
 * Estamos extraindo dessa biblioteca duas funções, a primeira é o startOfHour e a outra
 * é parseISO.
 *
 * startOfHour -> Ele colocará minutos como 0, segundos como 0, milisegundos como 0.
 * Deixando sempre um horário com a hora arredondada.
 *
 * parseISO -> Será responsável por converter uma string, para um formato date nativo
 * do javascript.
 *
 * isEqual -> Verifica se duas datas são iguais.
 *
 * Utilizamos interface sempre que precisamos ter tipagem em um elemento composto.
 * Veja nesse exemplo o array de appointments que possui interface.
 *
 * A rota não tem responsabilidade de se conectar com a fonte de dados de nossa aplicação.
 *
 * SoC => Separation of Concerns (Separação de preocupações).
 *
 * Quanto passamos a informação se um arquivo para outro chamamos de DTO -
 * Data Transfer Object. Para transferir dados de um arquivo para outro, é sempre
 * interessante utilizarmos os objetos do Javascript.
 *
 * Nossas rotas devem ter a responsabilidade de:
 * Receber a requisição, chamar outro arquivo para tratar a requisição e devolver
 * a resposta. Qualquer coisa que tivermos além disso dentro de um rota, precisaremos
 * abstrair dentro de um service.
 *
 * Não podemos confundir transformação de dados, com regras de negócios.
 * Por exemplo, parseISO apenas está transformando o dado. Isto é,
 * ele pega uma string e transforma essa string para o tipo Date do javascript.
 * Porém o startOfHour, já se trata de uma regra de negócio. Pois a regra de agendamento
 * está ocorrendo de hora em hora.
 *
 * SOLID
 *    -> Single Responsability Principle
 *    -> Dependency Invertion Principle
 *
 * Quando trabalhamos com interação em banco de dados devemos utilizar o async e
 * await. Lembrando que retorna uma promise e essas interações demoram um pouco
 * para serem executadas.
 */

import { Router, json } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

/**
 * Lembrando que o use é chamado antes de qualquer request.
 * Então no caso abaixo estou aplicando o middle de ensureAuthenticated,
 * em todas as rotas de agendamento.
 */
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            provider_id,
            date: parsedDate,
        });

        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default appointmentsRouter;
