import { Injectable, Inject } from '@nestjs/common';
import {
  Driver,
  VehicleCategory,
  Coordinates,
} from '../entities/driver.entity';
import {
  type DriverRepositoryPort,
  DRIVER_REPOSITORY,
} from '../ports/driver.repository.port';

@Injectable()
export class FindNearbyDriversUseCase {
  constructor(
    @Inject(DRIVER_REPOSITORY)
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(
    position: Coordinates,
    category: VehicleCategory,
    radiusKm: number = 5,
  ): Promise<Driver | null> {
    const nearbyDrivers = await this.driverRepository.findNearbyByCategory(
      position,
      category,
      radiusKm,
    );

    if (nearbyDrivers.length === 0) {
      return null;
    }

    return nearbyDrivers[0];
  }
}
