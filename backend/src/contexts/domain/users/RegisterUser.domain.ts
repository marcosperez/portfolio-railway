/**
 * DTO for register users
 * @example
 * {
 *  "name": "123",
 *  "username": "marcos",
 *  "email": "marcos@correo.com",
 *  "street": "santa els 123",
 *  "password": "222222222",
 *  "passwordConfirmation": "222222222"
 * }
 */
export interface RegisterUserDTO {
  username: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  email: string;
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  phone?: string;
  website?: string;
}
