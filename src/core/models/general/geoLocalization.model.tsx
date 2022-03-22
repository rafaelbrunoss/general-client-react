export class GeoLocalization {
  public latitude: number = 0;
  public longitude: number = 0;
  public altitude?: number = 0;

  constructor(geoLocalization: Partial<GeoLocalization>) {
    Object.assign(this, geoLocalization);
  }
}
