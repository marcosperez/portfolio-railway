import { Maybe } from "../Domain.common";

export interface UserDTO {
  id: Maybe<number>;
  name: string;
  username: string;
  email: string;
  street: Maybe<string>;
  suite: Maybe<string>;
  city: Maybe<string>;
  zipcode: Maybe<string>;
  phone: Maybe<string>;
  website: Maybe<string>;
}
