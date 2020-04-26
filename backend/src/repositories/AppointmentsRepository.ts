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
 * Relembrando que esse arquivo é responsável por tudo que vamos mexer nos dados
 */
import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

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

    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }

    public all(): Appointment[] {
        return this.appointments;
    }
}
export default AppointmentsRepository;
