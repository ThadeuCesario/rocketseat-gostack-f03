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
 */

import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(parsedDate, appointment.date),
    );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    const appointment = {
        id: uuid(),
        provider,
        date: parsedDate,
    };

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;
