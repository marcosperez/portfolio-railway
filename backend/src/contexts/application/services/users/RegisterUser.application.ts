import { inject, injectable } from "inversify";
import { RegisterUser } from "../../../domain/users/RegisterUser.domain";
import { User } from "../../../domain/users/User.domain";
import { UserRepositoryInterface } from "../../../infrastructure/repositories/users/User.repository.interface";
import { Service, ServiceResult } from "../Services.common";

@injectable()
export class RegisterUserService implements Service<RegisterUser, User> {
  // userRepository: UserRepositoryInterface;
  // constructor(userRepository: UserRepositoryInterface) {
  //   this.userRepository = userRepository;
  // }
  constructor(
    @inject("UserRepository") private userRepository: UserRepositoryInterface
  ) {}

  async execute(userRegisterData: RegisterUser): Promise<ServiceResult<User>> {
    const passwordHash = await User.hashPassword(userRegisterData.password);
    const newUser = new User({
      id: undefined,
      passwordHash,
      ...userRegisterData,
    });

    const dbUser = await this.userRepository.create(newUser);

    return [true, dbUser];
  }
}
