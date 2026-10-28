export type VehicleCategory = 'standard' | 'xl' | 'premium';

export interface RideOption {
  category: VehicleCategory;
  driverName: string;
  vehicleModel: string;
  estimatedArrivalMin: number;
  price: number;
}

export interface RideQuote {
  route: {
    encodedPolyline: string;
    distanceKm: number;
    durationMin: number;
  };
  options: RideOption[];
}
