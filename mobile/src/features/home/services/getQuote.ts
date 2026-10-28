import { Env } from '@/core';
import { RideQuote, VehicleCategory } from '../domain/ride';

interface QuoteResponseOption {
  category: VehicleCategory;
  driverId: string;
  driverName: string;
  plate: string;
  vehicleModel: string;
  estimatedArrivalMin: number;
  price: number;
}

interface QuoteResponse {
  encodedPolyline: string;
  distanceKm: number;
  durationMin: number;
  options: QuoteResponseOption[];
}

const URL = Env.API_URL;

function toRideQuote(response: QuoteResponse): RideQuote {
  return {
    route: {
      encodedPolyline: response.encodedPolyline,
      distanceKm: response.distanceKm,
      durationMin: response.durationMin,
    },
    options: response.options.map((opt) => ({
      category: opt.category,
      driverName: opt.driverName,
      vehicleModel: opt.vehicleModel,
      estimatedArrivalMin: opt.estimatedArrivalMin,
      price: opt.price,
    })),
  };
}

export async function getQuotes(): Promise<RideQuote> {
  const response = await fetch(`${URL}/rides/quote`);

  if (!response.ok) {
    throw Error(`Failed getQuotes: ${response.status}`);
  }

  const data = await response.json();
  return toRideQuote(data);
}
