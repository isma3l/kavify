import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindNearbyDriversUseCase } from './domain/use-cases/find-nearby-drivers.use-case';
import { DriverOrmEntity } from './infraestructure/persistence/driver.orm-entity';
import { DRIVER_REPOSITORY } from './domain/ports/driver.repository.port';
import { DriversController } from './infraestructure/presentation/drivers.controller';
import { TypeOrmDriverRepository } from './infraestructure/persistence/typeorm-driver.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriverOrmEntity])],
  controllers: [DriversController],
  providers: [
    FindNearbyDriversUseCase,
    {
      provide: DRIVER_REPOSITORY,
      useClass: TypeOrmDriverRepository,
    },
  ],
})
export class DriversModule {}
