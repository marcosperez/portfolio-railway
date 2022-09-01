export class AccessLog {
  id?: string;
  userId: string;
  user: string;
  date?: Date;
  instance: string;

  constructor(params: {
    id?: string;
    userId: string;
    user: string;
    date?: Date;
    instance?: string;
  }) {
    this.id = params.id;
    this.userId = params.userId;
    this.user = params.user;
    this.date = params.date;
    this.instance = params.instance || "app";
  }
}
