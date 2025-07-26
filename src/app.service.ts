import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Pelicula } from './entities/pelicula.entity';
import { PlanSuscripcion } from './entities/plan_suscripcion.entity';
import { Reproduccion } from './entities/reproduccion.entity';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class AppService {

  /** Planes iniciales */
  planesSuscripcion: PlanSuscripcion[] = [
    new PlanSuscripcion(1, 'Plan básico', 3000, '720p', true),
    new PlanSuscripcion(2, 'Plan estándar', 5000, '1024p', true),
    new PlanSuscripcion(3, 'Plan premium', 7000, '4k', false),
  ];

  /** Películas iniciales */
  peliculas: Pelicula[] = [
    new Pelicula(
      1,
      'Toy Story',
      'Animación',
      1995,
      'TE',
      81,
      'Inglés',
      ['Español', 'Francés', 'Alemán'],
      false,
    ),
    new Pelicula(
      2,
      'Harry Potter y la piedra filosofal',
      'Fantasía',
      2001,
      'TE+7',
      152,
      'Inglés',
      ['Español', 'Francés', 'Alemán'],
      false,
    ),
    new Pelicula(
      3,
      'El juego del miedo',
      'Terror',
      2004,
      'MA14',
      117,
      'Inglés',
      ['Español', 'Alemán'],
      false,
    ),
    new Pelicula(
      4,
      'Deadpool & Wolverine',
      'Acción',
      2024,
      'MA18',
      127,
      'Inglés',
      ['Español'],
      true,
    ),
  ];

  /** Usuarios iniciales */
  usuarios: Usuario[] = [
    new Usuario(
      1,
      'usuario1',
      'usuario1@mail.com',
      7,
      '1234',
      'Plan premium',
      [],
      ['Animación', 'Fantasía'],
    ),
    new Usuario(
      2,
      'usuario2',
      'usuario2@mail.com',
      15,
      'abcd',
      'Plan estándar',
      [],
      ['Acción', 'Aventura'],
    ),
    new Usuario(
      3,
      'usuario3',
      'usuario3@mail.com',
      23,
      'qwerty',
      'Plan premium',
      [],
      ['Ciencia Ficción'],
    ),
  ];


  //////////////////////////////////
  /// 2: MÓDULO PLAN SUSCRIPCIÓN ///
  //////////////////////////////////

  // 2.2.2: Obtener un plan según su id
  findPlanById(identificador: number): PlanSuscripcion | undefined {
    return this.planesSuscripcion.find((plan) => plan.id === identificador);
  }

  // 2.2.3: Obtener todos los planes
  findAllPlanes(): PlanSuscripcion[] {
    return this.planesSuscripcion;
  }

  
  ///////////////////////////
  /// 3: MÓDULO PELÍCULAS ///
  ///////////////////////////

  // 3.2.2: Registrar una nueva película.
  crearPelicula(bodyPelicula: Pelicula): Pelicula {
    // Crear un nueva película, asignarle el ID y agregarla al conjunto de películas
    const nuevaPelicula = new Pelicula(
      this.peliculas.length + 1,
      bodyPelicula.titulo,
      bodyPelicula.genero,
      bodyPelicula.anioEstreno,
      bodyPelicula.calificacion,
      bodyPelicula.duracion,
      bodyPelicula.idiomaOriginal,
      bodyPelicula.subtitulosDisponibles,
      bodyPelicula.estreno,
    );
    this.peliculas.push(nuevaPelicula);
    return nuevaPelicula;
  }

  // 3.2.3: Obtener una película según su ID.
  findPeliculaById(indentificador: number): Pelicula | undefined {
    return this.peliculas.find((pelicula) => pelicula.id === indentificador);
  }

  // 3.2.4: Obtener todas las películas. Permitir filtrar por género.
  findPeliculas(genero?: string): Pelicula[] {
    // Comprobar si el usuario envió un valor para género (genero != undefined).
    // Si se recibe un genero, se puede usar .filter() para obtener un array de coincidencias.
    if (genero) {
      return this.peliculas.filter((pelicula) => pelicula.genero === genero);
    }
    return this.peliculas;
  }


  //////////////////////////
  /// 4: MÓDULO USUARIOS ///
  //////////////////////////

  // 4.2.1: Registrar un nuevo usuario
  crearUsuario(bodyUsuario: Usuario): Usuario {
    // Validar que no exista un usuario registrado con el mismo correo.
    // Se puede usar el método .find() para verificar si existe un usuario cuyo correo coincida con el que viene en el Body.
    const usuarioExiste: Usuario | undefined = this.usuarios.find(
      (usuario) => usuario.correoElectronico === bodyUsuario.correoElectronico,
    );
    if (usuarioExiste) {
      throw new BadRequestException('El correo ya está registrado.');
    }

    // Crear un nuevo usuario al que le asignaremos un id y un historial de visualizaciones vacío.
    const nuevoUsuario: Usuario = new Usuario(
      this.usuarios.length + 1,
      bodyUsuario.nombre,
      bodyUsuario.correoElectronico,
      bodyUsuario.edad,
      bodyUsuario.contrasena,
      bodyUsuario.planSuscripcion,
      [],
      bodyUsuario.generosFavoritos,
    );

    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  // 4.2.2: Obtener usuario por ID
  findUsuarioById(id: number): Usuario | undefined {
    return this.usuarios.find((usuario) => usuario.id === id);
  }

  // 4.2.3: Reproducir una película
  reproducirPelicula(idUsuario: number, idPelicula: number): void {
    // 4.2.3.1: Validar película existe
    const pelicula: Pelicula | undefined = this.findPeliculaById(idPelicula);
    if (!pelicula) {
      throw new NotFoundException('Película no existe.');
    }

    // De paso, validar que el usuario existe
    const usuario: Usuario | undefined = this.findUsuarioById(idUsuario);
    if (!usuario) {
      throw new NotFoundException('Usuario no existe.');
    }

    // 4.2.3.2: Validar que, si la película es estreno, el plan de suscripción del usuario le permita verla
    if (pelicula.estreno) {
      if (usuario.planSuscripcion !== 'Plan premium') {
        throw new UnauthorizedException('Usuario no puede ver la película');
      }
    }

    // 4.2.3.3: Validar que el usuario tenga la edad suficiente para ver la película, según su calificación
    if (usuario.edad < 18 && pelicula.calificacion === 'MA18') {
      throw new UnauthorizedException('Usuario no puede ver la película');
    }
    if (usuario.edad < 14 && pelicula.calificacion === 'MA14') {
      throw new UnauthorizedException('Usuario no puede ver la película');
    }
    if (usuario.edad < 7 && pelicula.calificacion === 'TE+7') {
      throw new UnauthorizedException('Usuario no puede ver la película');
    }

    // 4.2.3.4: Crear la reproducción nueva y agregarla al historial del usuario
    const nuevaReproduccion = new Reproduccion(
      usuario.historialVisualizaciones.length + 1,
      pelicula,
      new Date(), // <-- Generará un valor tipo Date con formato AAAA-MM-DDTHH:MM:SS.MS (ejemplo: 2025-07-26T14:33:13.769Z)
    );

    usuario.historialVisualizaciones.push(nuevaReproduccion);
    return;
  }
}
