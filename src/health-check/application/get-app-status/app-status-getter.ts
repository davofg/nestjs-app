import { AppStatus } from '../../domain/app-status';

export class AppStatusGetter {
  get(): AppStatus {
    return AppStatus.createOk();
  }
}
