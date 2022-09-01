import { inject, injectable } from "inversify";
import { IEventPubSub } from "../../../shared/infrastructure/eventEmiterPubSub.interface";
import { LoginEvent } from "../../domain/domainEvents/LoginEvent";
import { LoginUserDTO } from "../../domain/dtos/LoginUser.dto";
import { LoginUserToken } from "../../domain/dtos/LoginUserToken.dto";
import { User } from "../../domain/models/User.domain";
import { UserRepositoryInterface } from "../../infrastructure/repositories/User.repository.interface";
import { Service, ServiceResult } from "../Services.common";

@injectable()
export class LoginUserService implements Service<LoginUserDTO, LoginUserToken> {
  constructor(
    @inject("UserRepository") private userRepository: UserRepositoryInterface,
    @inject("EventPubSub") private basicEventPubSub: IEventPubSub
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
    const loginEvent: LoginEvent = new LoginEvent({
      user: user.name,
      userId: user.id,
      instance: "app1",
    });
    this.basicEventPubSub.pub("LoginEvent", loginEvent);
    return [true, { token: tokenJWT }];
  }
}
