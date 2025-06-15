export class AppStatus {
  constructor(
    private readonly _status: 'ok',
    private readonly _timestamp: string
  ) {}

  static createOk(): AppStatus {
    return new AppStatus('ok', new Date().toISOString());
  }

  get status(): string {
    return this._status;
  }

  get timestamp(): string {
    return this._timestamp
  }
}
