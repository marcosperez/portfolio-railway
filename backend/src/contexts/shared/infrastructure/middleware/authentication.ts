import * as express from "express";
import { User } from "../../../users/domain/models/User.domain";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (securityName === "bearer_token") {
        const token = !!request.headers["authorization"]
          ? request.headers["authorization"].replace("Bearer ", "")
          : null;

        if (!token) {
          reject(new Error("No token provided"));
        }

        // TODO: Implement scopes
        console.log(scopes);
        const isValid = await User.validateJWT(token as string);
        console.log(isValid);
        resolve(isValid);
      }

      reject(new Error("Authentication Failed - Token not found"));
    } catch (e) {
      console.log(`[expressAuthentication][Error] ${e}`);
      reject(new Error("Authentication Failed"));
    }
  });
}
