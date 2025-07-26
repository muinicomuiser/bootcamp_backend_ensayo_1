import { Injectable } from '@nestjs/common';
import { PlanSuscripcion } from './entities/plan_suscripcion.entity';

@Injectable()
export class AppService {

  planesSuscripcion: PlanSuscripcion[] = []

  // PLAN SUSCRIPCION
  findPlanById(identificador: number): PlanSuscripcion | undefined {
    return this.planesSuscripcion.find( plan => plan.id === identificador )
  }

  findAllPlanes(): PlanSuscripcion[]{
    return this.planesSuscripcion
  }

  // Saludin
  getHello(): string {
    return 'Hello World!';
  }
}
