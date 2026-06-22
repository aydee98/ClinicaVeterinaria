export type RequestStatus = "PENDIENTE" | "EN_ATENCION" | "FINALIZADO";
export type RequestPriority = "BAJA" | "MEDIA" | "ALTA";
export type ServiceType = "CONSULTA" | "VACUNACION" | "EMERGENCIA" | "GROOMING";

export interface Request {
  id: string;
  clienteNombre: string;
  telefono: string;
  mascotaNombre: string;
  tipoServicio: ServiceType;
  prioridad: RequestPriority;
  descripcion: string;
  estado: RequestStatus;
  fechaRegistro: Date;
}
