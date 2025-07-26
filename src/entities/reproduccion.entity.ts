import { Pelicula } from "./pelicula.entity";

export class Reproduccion{
    constructor(
        public id: number,
        public pelicula: Pelicula,
        public fecha: Date
    ){}
}
