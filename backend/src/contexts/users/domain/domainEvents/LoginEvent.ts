export class LoginEvent {
  userId: string;
  user: string;
  date: Date;
  instance: string;

  constructor(params: {
    userId: string;
    user: string;
    date?: Date;
    instance?: string;
  }) {
    this.userId = params.userId;
    this.user = params.user;
    this.date = params.date || new Date();
    this.instance = params.instance || "unique";
  }
}
