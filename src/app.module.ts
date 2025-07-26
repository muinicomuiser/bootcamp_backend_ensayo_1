import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanesController } from './planes/planes.controller';
import { PeliculasController } from './peliculas/peliculas.controller';
import { UsuariosController } from './usuarios/usuarios.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    PlanesController,
    PeliculasController,
    UsuariosController,
  ],
  providers: [AppService],
})
export class AppModule {}
