import { GeoLocalization } from '@core/models';

export class Address {
  public street: string = '';
  public streetNumber: string = '';
  public complement?: string = '';
  public neighborhood: string = '';
  public city: string = '';
  public state: string = '';
  public postalCode: string = '';
  public country: string = '';
  public geoLocalization?: GeoLocalization = undefined;

  constructor(address: Partial<Address>) {
    Object.assign(this, address);
  }
}
