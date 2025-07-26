import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PlanSuscripcion } from 'src/entities/plan_suscripcion.entity';

@Controller('planes')
export class PlanesController {

    constructor(private readonly appService: AppService){}

    // Obtener un plan según su id
    @Get(":id")
    findById(@Param("id") id: string): PlanSuscripcion{
        const idNumber: number = Number(id);
        const plan = this.appService.findPlanById(idNumber)
        if(plan){
            return plan
        }
        throw new NotFoundException("Plan not found")
    }

    // Obtener todos los planes
    @Get()
    findAll(): PlanSuscripcion[]{
        return this.appService.findAllPlanes()
    }
}

