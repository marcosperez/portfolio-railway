import { inject, injectable } from "inversify";
import {
  Service,
  ServiceResult,
} from "../../../users/application/Services.common";
import { AccessLog } from "../../domain/models/AccessLog.model";
import { AccessLogRepositoryInterface } from "../../infrastructure/repositories/AccessLog.repository.interface";

export interface AccessLogData {
  userId: string;
  user: string;
  date?: Date;
  instance?: string;
}

@injectable()
export class RegisterAccessLogs
  implements Service<AccessLogData, AccessLog | undefined>
{
  constructor(
    @inject("AccessLogRepository")
    private accessLogRepository: AccessLogRepositoryInterface
  ) {}

  async execute(
    data: AccessLogData
  ): Promise<ServiceResult<AccessLog | undefined>> {
    const accessLog = new AccessLog(data);
    const log = await this.accessLogRepository.save(accessLog);
    if (!log) return [false, undefined];

    return [true, log];
  }
}
