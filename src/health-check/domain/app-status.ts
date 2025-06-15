export class AppStatus {
  constructor(
    public readonly status: 'ok',
    public readonly timestamp: string
  ) {}

  static createOk(): AppStatus {
    return new AppStatus('ok', new Date().toISOString());
  }
}
