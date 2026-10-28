import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Driver,
  VehicleCategory,
  DriverStatus,
  Coordinates,
} from '../../domain/entities/driver.entity';
import { DriverOrmEntity } from './driver.orm-entity';
import { DriverRepositoryPort } from '../../domain/ports/driver.repository.port';

interface GeoJsonPoint {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

@Injectable()
export class TypeOrmDriverRepository implements DriverRepositoryPort {
  constructor(
    @InjectRepository(DriverOrmEntity)
    private readonly repo: Repository<DriverOrmEntity>,
  ) {}

  async findById(id: string): Promise<Driver | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? this.toDomain(found) : null;
  }

  async save(driver: Driver): Promise<Driver> {
    const ormEntity = this.toOrm(driver);
    const saved = await this.repo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findNearbyByCategory(
    position: Coordinates,
    category: VehicleCategory,
    radiusKm: number,
  ): Promise<Driver[]> {
    const radiusMeters = radiusKm * 1000;

    const results = await this.repo
      .createQueryBuilder('driver')
      .where('driver.category = :category', { category })
      .andWhere('driver.status = :status', { status: DriverStatus.AVAILABLE })
      .andWhere(
        `ST_DWithin(
          driver.position,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
          :radius
        )`,
        { lng: position.lng, lat: position.lat, radius: radiusMeters },
      )
      .orderBy(
        `ST_Distance(
          driver.position,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography
        )`,
        'ASC',
      )
      .setParameters({ lng: position.lng, lat: position.lat })
      .getMany();

    return results.map((r) => this.toDomain(r));
  }

  private toDomain(orm: DriverOrmEntity): Driver {
    const [lng, lat] = this.parsePosition(
      orm.position as unknown as GeoJsonPoint,
    );
    return new Driver(
      orm.id,
      orm.name,
      orm.plate,
      orm.vehicleModel,
      orm.category as VehicleCategory,
      { lat, lng },
      orm.status as DriverStatus,
    );
  }

  private toOrm(driver: Driver): DriverOrmEntity {
    const orm = new DriverOrmEntity();
    orm.id = driver.id;
    orm.name = driver.name;
    orm.plate = driver.plate;
    orm.vehicleModel = driver.vehicleModel;
    orm.category = driver.category;
    orm.status = driver.status;
    orm.position = `SRID=4326;POINT(${driver.currentPosition.lng} ${driver.currentPosition.lat})`;
    return orm;
  }

  private parsePosition(position: GeoJsonPoint): [number, number] {
    if (position?.coordinates) {
      return [position.coordinates[0], position.coordinates[1]];
    }
    return [0, 0];
  }
}
