export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  phone?: string;
  website?: string;

  roles: string[];
  token: string;
}
