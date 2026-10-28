import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { FindNearbyDriversUseCase } from '../../domain/use-cases/find-nearby-drivers.use-case';
import { VehicleCategory } from '../../domain/entities/driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(
    private readonly findNearbyDriversUseCase: FindNearbyDriversUseCase,
  ) {}

  @Get('nearby')
  async findNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('category') category: string,
  ) {
    if (!lat || !lng || !category) {
      throw new BadRequestException(
        'Se requieren los parámetros lat, lng y category',
      );
    }

    if (!Object.values(VehicleCategory).includes(category as VehicleCategory)) {
      throw new BadRequestException(`Categoría inválida: ${category}`);
    }

    const driver = await this.findNearbyDriversUseCase.execute(
      { lat: parseFloat(lat), lng: parseFloat(lng) },
      category as VehicleCategory,
    );

    return (
      driver ?? {
        message: 'No hay choferes disponibles en esta zona para esta categoría',
      }
    );
  }
}
