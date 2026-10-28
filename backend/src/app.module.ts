import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './modules/drivers/drivers.module';
import { RidesModule } from './modules/rides/rides.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // así podés usar ConfigService en cualquier módulo sin re-importar
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true, // carga automáticamente las entidades registradas en cada módulo
        synchronize: true, // ⚠️ solo para desarrollo, ver nota abajo
        ssl: {
          rejectUnauthorized: false, // necesario para conectar con Neon
        },
      }),
    }),
    DriversModule,
    RidesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
