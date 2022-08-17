import { inject, injectable } from "inversify";
import { LoginUserDTO } from "../../domain/dto/LoginUser.domain";
import { LoginUserToken } from "../../domain/dto/LoginUserToken.domain";
import { User } from "../../domain/models/User.domain";
import { UserRepositoryInterface } from "../../infrastructure/repositories/User.repository.interface";
import { Service, ServiceResult } from "../Services.common";

@injectable()
export class LoginUserService implements Service<LoginUserDTO, LoginUserToken> {
  constructor(
    @inject("UserRepository") private userRepository: UserRepositoryInterface
  ) {}

  async execute(
    userLoginData: LoginUserDTO
  ): Promise<ServiceResult<LoginUserToken>> {
    const user = await this.userRepository.findByUsername(userLoginData.login);
    if (!user) {
      console.log("[LoginUserService] Usuario no encontrado");
      return [false, undefined];
    }

    if (
      !(await User.comparePassword(user.passwordHash, userLoginData.password))
    ) {
      console.log("[LoginUserService] Hash diferente ", user.passwordHash);
      return [false, undefined];
    }

    const tokenJWT = User.generateJWT({ username: userLoginData.login });
    return [true, { token: tokenJWT }];
  }
}