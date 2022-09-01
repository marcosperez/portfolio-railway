import { AccessLog } from "../../domain/models/AccessLog.model";

export interface AccessLogRepositoryInterface {
  save(accessLog: AccessLog): Promise<AccessLog | null>;
}
