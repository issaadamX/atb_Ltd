declare module './appointment.api' {
  export interface Appointment {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    service: string;
    message?: string;
    status: string;
    createdAt: string;
  }

  export const appointmentAPI: {
    getAllAppointments: () => Promise<Appointment[]>;
    getAppointmentById: (id: number) => Promise<Appointment>;
    updateAppointmentStatus: (id: number, status: string) => Promise<Appointment>;
    deleteAppointment: (id: number) => Promise<void>;
  };
}
