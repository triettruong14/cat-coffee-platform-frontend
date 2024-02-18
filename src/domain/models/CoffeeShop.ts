export class CoffeeShop {
  private _shopId: number;
  private _accountId: number;
  private _shopName: string;
  private _startDate: string;
  private _endDate: string;
  private _address: string;
  private _status: string;

  constructor(
    shopId: number,
    accountId: number,
    shopName: string,
    startDate: string,
    endDate: string,
    address: string,
    status: string,
  ) {
    this._shopId = shopId;
    this._accountId = accountId;
    this._shopName = shopName;
    this._startDate = startDate;
    this._endDate = endDate;
    this._address = address;
    this._status = status;
  }

  get shopId(): number {
    return this._shopId;
  }

  get accountId(): number {
    return this._accountId;
  }

  get shopName(): string {
    return this._shopName;
  }

  get startDate(): string {
    return this._startDate;
  }

  get endDate(): string {
    return this._endDate;
  }

  get address(): string {
    return this._address;
  }

  get status(): string {
    return this._status;
  }
}
