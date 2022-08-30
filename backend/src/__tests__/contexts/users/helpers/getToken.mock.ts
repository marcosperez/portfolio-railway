import { User } from "../../../../contexts/users/domain/models/User.domain";

export function generateMockToken() {
  return User.generateJWT({ username: "test" });
}
