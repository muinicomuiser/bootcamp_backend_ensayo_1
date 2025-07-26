import { PlanSuscripcion } from "./plan_suscripcion.entity";
import { Reproduccion } from "./reproduccion.entity";

export class Usuario{
    constructor(
        public id: number,
        public nombre: string,
        public correoElectronico: string,
        public edad: number,
        public contrasena: string,
        public planSuscripcion: PlanSuscripcion,
        public historialVisualizaciones: Reproduccion[],
        public generosFavoritos: string
    ){}
}
