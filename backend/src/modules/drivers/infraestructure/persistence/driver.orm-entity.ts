import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('drivers')
export class DriverOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  plate!: string;

  @Column({ name: 'vehicle_model' })
  vehicleModel!: string;

  @Column({ type: 'enum', enum: ['standard', 'xl', 'premium'] })
  category!: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  position!: string;

  @Column({
    type: 'enum',
    enum: ['available', 'busy', 'offline'],
    default: 'available',
  })
  status!: string;
}
