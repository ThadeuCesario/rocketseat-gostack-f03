/**
 * Um serviço geralmente possui uma única e exclusiva funcionalidade.
 * Não é o correto colocar várias lógicas dentro de um serviço.
 *
 * Precisamos tratar:
 * -> O recebimento das informações
 * -> Tratativa de erros e excessões
 * -> Acesso ao repositório
 *
 * Os services não tem acesso direto aos dados da requisição e os dados da resposta.
 *
 * Vamos aplicar um princípio chamado Dependency Inversion (SOLID), esse princípio garante que
 * sempre que o service tiver uma dependência externa, como por exemplo o
 * 'appointmentsRepository' ao invés de instaciarmos a classe dentro do service,
 * vamos receber esse appointmentsRepository como um parâmetro da nossa classe.
 *
 * Toda função assincrona retorna uma promise, e o que passarmos dentro do <>
 * será o tipo de retorno que aquela função fornecerá.
 */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppoinmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppoinmentsRepository,
        ); // appointmentsRepository possúi os métodos que podemos executar

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            // Como não temos acesso ao response, vamos retornar erros.
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
