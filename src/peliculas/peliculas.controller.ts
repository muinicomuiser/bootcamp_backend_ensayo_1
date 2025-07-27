import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Pelicula } from 'src/entities/pelicula.entity';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly appService: AppService) {}

  // 3.1.1: Crear una nueva película
  @Post()
  crearPelicula(@Body() nuevaPelicula: Pelicula): Pelicula {
    return this.appService.crearPelicula(nuevaPelicula);
  }

  // 3.1.2: Obtener una película según su ID
  @Get(':id')
  obtenerPorId(@Param('id') id: string): Pelicula {
    const pelicula = this.appService.findPeliculaById(Number(id));
    if (pelicula) {
      return pelicula;
    }
    throw new NotFoundException('Pelicula not found');
  }

  // 3.1.3: Obtener todas las películas
  @Get()
  obtenerPeliculas(@Query('genero') genero?: string): Pelicula[] {
    return this.appService.findPeliculas(genero);
  }

  ///////////////////////////////////////////////////
  /// 5. Módulo Sugerencia de Películas (desafío) ///
  ///////////////////////////////////////////////////

  // 5.1.1: Sugerir películas a usuario
  @Get('sugerencias/:idUsuario')
  sugerirPeliculas(@Param('idUsuario') idUsuario: string): Pelicula[] {
    return this.appService.sugerirPeliculas(Number(idUsuario));
  }
}
