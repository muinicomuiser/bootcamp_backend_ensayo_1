import { Reproduccion } from './reproduccion.entity';

export class Usuario {
  constructor(
    public id: number,
    public nombre: string,
    public correoElectronico: string,
    public edad: number,
    public contrasena: string,
    public planSuscripcion: string, // <-- Queda más cómodo indicar solo el nombre del plan, en vez de la clase PlanSuscripcion. También podría usarse el ID de plan.
    public historialVisualizaciones: Reproduccion[],
    public generosFavoritos: string[], // <-- En la clase de ayudantía faltó ponerle el []
  ) {}
}
