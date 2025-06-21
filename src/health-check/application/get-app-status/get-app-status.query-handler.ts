import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetAppStatusQuery } from "./get-app-status.query";
import { AppStatusGetter } from "src/health-check/domain/service/app-status-getter";

@QueryHandler(GetAppStatusQuery)
export class GetAppStatusQueryHandler implements IQueryHandler<GetAppStatusQuery> {
    constructor(
        private readonly getter: AppStatusGetter
    ) { }

    async execute(_: GetAppStatusQuery): Promise<{
        status: string;
        timestamp: string;
    }> {
        const appStatus = this.getter.get();

        return {
            status: appStatus.status,
            timestamp: appStatus.timestamp
        };
    }
}
