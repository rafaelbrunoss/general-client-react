import { NULL_GUID } from '@core/utils';

export class Account {
  public _id: string = NULL_GUID;
  public name: string = '';

  constructor(account: Partial<Account>) {
    Object.assign(this, account);
  }
}
