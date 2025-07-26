import { Injectable } from '@nestjs/common';
import { PlanSuscripcion } from './entities/plan_suscripcion.entity';
import { Pelicula } from './entities/pelicula.entity';

@Injectable()
export class AppService {

  planesSuscripcion: PlanSuscripcion[] = []
  peliculas: Pelicula[] = []

  // PLAN SUSCRIPCION
  findPlanById(identificador: number): PlanSuscripcion | undefined {
    return this.planesSuscripcion.find( plan => plan.id === identificador )
  }

  findAllPlanes(): PlanSuscripcion[]{
    return this.planesSuscripcion
  }


  // PELICULAS  
  crearPelicula(bodyPelicula: Pelicula): Pelicula {
    const nuevaPelicula = new Pelicula(
      this.peliculas.length+1,
      bodyPelicula.titulo,
      bodyPelicula.genero,
      bodyPelicula.anioEstreno,
      bodyPelicula.calificacion,
      bodyPelicula.duracion,
      bodyPelicula.idiomaOriginal,
      bodyPelicula.subtitulosDisponibles,
      bodyPelicula.estreno
    )
    this.peliculas.push(nuevaPelicula)
    return nuevaPelicula
  }

  findPeliculaById(indentificador: number): Pelicula | undefined {
    return this.peliculas.find( pelicula => pelicula.id === indentificador )
  }

  findPeliculas(genero?: string): Pelicula[] {
    if(genero){
      return this.peliculas.filter( pelicula => pelicula.genero === genero )
    }
    return this.peliculas
  }

  // Saludin
  getHello(): string {
    return 'Hello World!';
  }
}
