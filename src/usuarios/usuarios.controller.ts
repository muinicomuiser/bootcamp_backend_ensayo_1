import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Usuario } from 'src/entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly appService: AppService) {}

  // 4.1.1: Registrar un nuevo usuario
  @Post()
  crearUsuario(@Body() bodyUsuario: Usuario): Usuario {
    return this.appService.crearUsuario(bodyUsuario);
  }

  // 4.1.2: Obtener un usuario según su ID
  @Get(':id')
  findById(@Param('id') id: string): Usuario {
    const usuario = this.appService.findUsuarioById(Number(id));
    if (usuario) {
      return usuario;
    }
    throw new NotFoundException('Usuario no encontrado');
  }

  // 4.1.3: Reproducir una película
  @HttpCode(200) // <-- El código 200 se toma como una respuesta OK (aunque no es obligatorio definirlo, porque el método GET por defecto entrega un código 200)
  @Get(':idUsuario/peliculas/:idPelicula')
  reproducirPelicula(
    @Param('idUsuario') idUsuario: string,
    @Param('idPelicula') idPelicula: string,
  ): void {
    return this.appService.reproducirPelicula(
      Number(idUsuario),
      Number(idPelicula),
    );
  }
}
