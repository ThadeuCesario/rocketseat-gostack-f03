import { Router } from 'express';

/**
 * O uuid é uma biblioteca que é responsável por gerar um id único universal e individual
 */
import { uuid } from 'uuidv4';

/**
 * Utilizando o como yarn add date-fns, estamos importando essa biblioteca que
 * podemos trabalhar com horas dentro do javascript.
 *
 * O primeiro elemento que importamos é o startOfHour, que será responsável por
 * setar a hora no inicio. Setando o minuto, o segundo e o milisegundo como zero.
 *
 * O Segundo elemento que importamos é o parseISO, que será responsável por
 * converter uma string (a forma que estamos enviando atuamente), em um elemento
 * Date nativo do javascript.
 *
 * O terceiro elemento será responsável por realizar a comparação entre datas.
 */
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appoinmentsRouter = Router();

/**
 * Definimos sempre uma interface quando queremos definir tipagem de uma informação
 * composta.
 */
interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

/**
 * Assim adicionamos a tipagem dentro do array de appointments.
 * Veja que precisamos criar uma interface para isso.
 */
const appointments: Appointment[] = [];

appoinmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  /**
   * Agora vamos trabalhar com o 'date' que recebemos dentro do request.body.
   *
   * Então primeiramente, estamos convertendo a data para o elemento nativo Date()
   * do javascript. Em seguida, estamos setando a hora para início.
   * Isso quer dizer que, qualquer minuto, segundo e milisegundo serão automaticamente
   * zerados, mantendo uma horá perfeitamente arredondada.
   */
  const parsedDate = startOfHour(parseISO(date));

  /**
   * Essa variável será responsável por encontrar um agendamento na mesma data.
   */
  const findAppointmentInSameDate = appointments.find(appointment =>
    /**
     * Essa função ira comparar o parsedDate com o appointment.date, se for
     * será retornado o appointment para dentro da variável.
     */
    isEqual(parsedDate, appointment.date)
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked!' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appoinmentsRouter;
