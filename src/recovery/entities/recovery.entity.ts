export class Recovery {
  constructor(code: string, email: string) {
    this.code = code;
    this.email = email;
  }

  id: string;
  code: string;
  email: string;
}
