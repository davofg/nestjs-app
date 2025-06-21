import { AppStatus } from '../app-status';

export class AppStatusGetter {
  get(): AppStatus {
    return AppStatus.createOk();
  }
}
