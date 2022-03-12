export default class TodoErrorsDto {
  ok: boolean;
  error: string;
  errors: {
    title: string;
    description: string;
    status: string;
    deadline: Date;
  }
}