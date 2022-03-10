export default class UserErrorsDto {
  ok: boolean;
  error: string;
  errors: {
    email: string;
    name: string;
    password: string;
  }
}