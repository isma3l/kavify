import { Controller, Get } from '@nestjs/common';

@Controller('rides')
export class RidesController {
  @Get('quote')
  getQuote() {
    return {
      encodedPolyline:
        'inr{FupfLDLk@|@k@z@uArBg@V{DeGQ?E@g@_@_AwAuB}CcBcCcDyEiD}EgBiCsCaEUa@OKGGOMWOa@Mi@KQCOEOKQUSg@McAMgAOi@Q]EMw@kAwAuBgBiCeA{AU]Yc@U^o@bAo@~@yChE}FpIcAzAiA|A_@j@g@w@}BiD}G}JiA}A}C{E_CfDk@z@NR`AtAfCvDfEhG',
      distanceKm: 3.15,
      durationMin: 11,
      options: [
        {
          category: 'standard',
          driverId: 'mock-1',
          driverName: 'Carlos Gómez',
          plate: 'B-1234-CD',
          vehicleModel: 'Toyota Corolla',
          estimatedArrivalMin: 3,
          price: 6.5,
        },
        {
          category: 'xl',
          driverId: 'mock-2',
          driverName: 'Sergio Navarro',
          plate: '5718-LGX',
          vehicleModel: 'Citroën SpaceTourer',
          estimatedArrivalMin: 5,
          price: 9.8,
        },
        {
          category: 'premium',
          driverId: 'mock-3',
          driverName: 'Alejandro Vega',
          plate: '3056-MNS',
          vehicleModel: 'Tesla Model S',
          estimatedArrivalMin: 4,
          price: 13.2,
        },
      ],
    };
  }
}
