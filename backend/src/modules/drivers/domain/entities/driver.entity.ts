export enum VehicleCategory {
  STANDARD = 'standard',
  XL = 'xl',
  PREMIUM = 'premium',
}

export enum DriverStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFFLINE = 'offline',
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export class Driver {
  constructor(
    public readonly id: string,
    public name: string,
    public plate: string,
    public vehicleModel: string,
    public category: VehicleCategory,
    public currentPosition: Coordinates,
    public status: DriverStatus,
  ) {}

  isAvailableForRide() {
    return this.status === DriverStatus.AVAILABLE;
  }

  assignToRide() {
    if (!this.isAvailableForRide()) {
      throw new Error('Driver not available');
    }
    this.status = DriverStatus.BUSY;
  }
}
