export class Cat {
  private _name: string;
  private _type: string;
  private _status: boolean;

  constructor(name: string, type: string, status: boolean) {
    this._name = name;
    this._type = type;
    this._status = status;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get status(): boolean {
    return this._status;
  }
}
