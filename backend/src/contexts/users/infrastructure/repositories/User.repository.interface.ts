import { GetUsersFilterCriteria } from "../../domain/dtos/GetUsersFilterCriteria.dto";
import { DefaultRepository } from "../../../shared/infrastructure/Infrastructure.common";
import { User } from "../../domain/models/User.domain";

export interface UserRepositoryInterface
  extends DefaultRepository<User, GetUsersFilterCriteria> {
  findByUsername(login: string): Promise<User | null>;
}
