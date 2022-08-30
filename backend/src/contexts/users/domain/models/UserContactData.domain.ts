export class UserContactData {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  phone?: string;
  website?: string;

  constructor(
    street?: string,
    suite?: string,
    city?: string,
    zipcode?: string,
    phone?: string,
    website?: string
  ) {
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.phone = phone;
    this.website = website;
  }
}
