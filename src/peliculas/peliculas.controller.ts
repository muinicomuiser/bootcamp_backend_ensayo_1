import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Pelicula } from 'src/entities/pelicula.entity';

@Controller('peliculas')
export class PeliculasController {

    constructor(private readonly appService: AppService){}

    @Post()
    crearPelicula(@Body() nuevaPelicula: Pelicula): Pelicula {
        return this.appService.crearPelicula(nuevaPelicula)
    }

    @Get(":id")
    obtenerPorId(@Param("id") id: string): Pelicula{
        const pelicula = this.appService.findPeliculaById(Number(id))
        if(pelicula){
            return pelicula
        }
        throw new NotFoundException("Pelicula not found")
    }

    @Get()
    obtenerPeliculas(@Query("genero") genero?: string): Pelicula[]{
        return this.appService.findPeliculas(genero)
    }
}
