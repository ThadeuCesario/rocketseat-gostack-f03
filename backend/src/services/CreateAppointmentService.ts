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
 */
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppoinmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppoinmentsRepository;

    constructor(appointmentsRepository: AppoinmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            // Como não temos acesso ao response, vamos retornar erros.
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
