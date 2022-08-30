import { GetUsersFilterCriteria } from "../../domain/dto/GetUsersFilterCriteria.dto";
import { PageData } from "../../../shared/infrastructure/Infrastructure.common";
import { Service, ServiceResult } from "../Services.common";
import { UserRepositoryInterface } from "../../infrastructure/repositories/User.repository.interface";
import { inject, injectable } from "inversify";
import { UserDTO } from "../../domain/dto/User.dto";
import { User } from "../../domain/models/User.domain";

@injectable()
export class GetUsersService
  implements Service<GetUsersFilterCriteria, PageData<UserDTO>>
{
  constructor(
    @inject("UserRepository") private userRepository: UserRepositoryInterface
  ) {}

  async execute(
    query: GetUsersFilterCriteria
  ): Promise<ServiceResult<PageData<UserDTO>>> {
    const users = await this.userRepository.find(query);
    const countUsers = await this.userRepository.count(query);

    const page = {
      list: users.map((u) => User.toUserDTO(u)),
      count: countUsers,
    };

    return [true, page];
  }
}
