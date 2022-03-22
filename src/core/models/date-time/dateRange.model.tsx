export class DateRange {
  public start: Date = new Date();
  public end: Date = new Date();

  constructor(dateRange: Partial<DateRange>) {
    Object.assign(this, dateRange);
  }
}
