export class User {
  constructor(
    public readonly id: string,
    public readonly authUid: string,
    public name: string,
    public email: string | null,
    public phone: string | null,
    public readonly createdAt: Date,
  ) {}

  static createNew(params: {
    id: string;
    authUid: string;
    name: string;
    email: string | null;
    phone: string | null;
  }): User {
    return new User(
      params.id,
      params.authUid,
      params.name,
      params.email,
      params.phone,
      new Date(),
    );
  }
}
