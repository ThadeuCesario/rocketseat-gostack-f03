/**
 * Repositórios:
 * Podemos pensar no repositório fazendo a ligação entre a persistência dos dados e
 * a nossa rota.
 * Persistência <-> Repositório <-> Rota
 * Dentro do repositório podemos fazer consultas das informações persistidas em dentro
 * de um banco ou alguma variável.
 * Geralmente teremos um repositório por model
 *
 * Estamos utilizando o private pois significa que é uma variável que não é acessada
 * por fora da classe.
 *
 * Relembrando que esse arquivo é responsável por tudo que vamos mexer nos dados.
 *
 * Aplicamos uma modificação dentro da função de 'create'. Para não termos parametros
 * de forma fixa, estou mandando um 'data' que é uma DTO. Data Transfer Object.
 */
import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointment || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }

    public all(): Appointment[] {
        return this.appointments;
    }
}
export default AppointmentsRepository;
