import {
  Driver,
  VehicleCategory,
  Coordinates,
} from '../entities/driver.entity';

export interface DriverRepositoryPort {
  findById(id: string): Promise<Driver | null>;
  save(driver: Driver): Promise<Driver>;
  findNearbyByCategory(
    position: Coordinates,
    category: VehicleCategory,
    radiusKm: number,
  ): Promise<Driver[]>;
}

export const DRIVER_REPOSITORY = 'DRIVER_REPOSITORY';
