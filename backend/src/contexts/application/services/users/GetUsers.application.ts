import { GetUsersFilterCriteria } from "../../../domain/users/GetUsersFilterCriteria.domain";
import { User } from "../../../domain/users/User.domain";
import { PageData } from "../../../infrastructure/Infrastructure.common";
import { UserDTO } from "../../../domain/users/UserDTO.domain";
import { Service, ServiceResult } from "../Services.common";
import { UserRepositoryInterface } from "../../../infrastructure/repositories/users/User.repository.interface";
import { inject, injectable } from "inversify";

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
