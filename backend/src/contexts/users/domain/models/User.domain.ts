import { UserContactData } from "./UserContactData.domain";
import bcrypt from "bcrypt";
import { UserDTO } from "../dto/User.dto";
import { sign, verify } from "jsonwebtoken";
import { JWTPayload } from "../dto/JWTPayload.dto";
const tokenSecret = process.env.TOKEN_SECRET || "secreto123?@";

export class User {
  id?: string;
  name: string;
  username: string;
  passwordHash: string;
  email: string;
  address?: UserContactData;

  constructor(params: {
    id?: string | null;
    name: string;
    username: string;
    email: string;
    passwordHash: string;
    street?: string | null;
    suite?: string | null;
    city?: string | null;
    zipcode?: string | null;
    phone?: string | null;
    website?: string | null;
  }) {
    this.id = params.id || "";
    this.name = params.name;
    this.passwordHash = params.passwordHash;
    this.username = params.username;
    this.email = params.email;

    this.address = new UserContactData(
      params.street || "",
      params.suite || "",
      params.city || "",
      params.zipcode || "",
      params.phone || "",
      params.website || ""
    );
  }

  persistData() {
    return {
      id: this.id || undefined,
      name: this.name,
      username: this.username,
      email: this.email,
      street: this.address?.street,
      suite: this.address?.suite,
      city: this.address?.city,
      zipcode: this.address?.zipcode,
      phone: this.address?.phone,
      website: this.address?.website,
      passwordHash: this.passwordHash,
    };
  }

  static toUserDTO(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      street: user.address?.street,
      suite: user.address?.suite,
      city: user.address?.city,
      zipcode: user.address?.zipcode,
      phone: user.address?.phone,
      website: user.address?.website,
    };
  }

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
  }

  static generateJWT(payload: JWTPayload) {
    return sign(payload, tokenSecret, { expiresIn: "1800s" });
  }

  static validateJWT(token: string) {
    return new Promise((resolve, reject) => {
      verify(token, tokenSecret, (err: any, decoded: any) => {
        if (err) {
          reject(err);
          return;
        }
        // TODO: Define scopes if is required
        resolve(decoded);
      });
    });
  }
}
