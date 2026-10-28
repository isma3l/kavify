import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller'; // ajustá la ruta según dónde lo pongas

@Module({
  controllers: [RidesController],
})
export class RidesModule {}
