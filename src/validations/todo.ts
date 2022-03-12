import { get } from 'lodash';
import CreateTodoDto from 'src/to-do/dtos/create-todo.dto';

export async function validateTodo(todoRequest: CreateTodoDto, todoModel: any): Promise<any> {
  const ERRORS: any = {
    id: '',
    title: '',
    description: '',
    status: '',
    deadline: ''
  }
    if (todoRequest) {

      const { title, description, status, deadline, id } = todoRequest;
      
      if (!title) {
        ERRORS.title = 'O título do TODO não pode ser vazio.';
      }
      if (!description) {
        ERRORS.description = 'A descrição do TODO não pode ser vazia.';
      }
      if (!status) {
        ERRORS.status = 'O TODO precisa ter um status informado.';
      }
      if (!deadline) {
        ERRORS.deadline = 'O TODO precisa ter um prazo informado.';
      }
      if (id) {
        ERRORS.id = 'O ID do TODO não pode ser alterado ou informado!';
      }
    
      const ID_ERROR = (!!get(ERRORS, 'id') && 'id' || '');
      const TITLE_ERROR = (!!get(ERRORS, 'title') && 'title' || '');
      const DESCRIPTION_ERROR = (!!get(ERRORS, 'description') && 'description' || '');
      const STATUS_ERROR = (!!get(ERRORS, 'status') && 'status');
      const DEADLINE_ERROR = (!!get(ERRORS, 'deadline') && 'deadline' || '');

      let error: any = ID_ERROR
        || TITLE_ERROR
        || DESCRIPTION_ERROR
        || STATUS_ERROR
        || DEADLINE_ERROR
        || '';

      const ok = error === '';
      return {
        ok: ok,
        error: error,
        errors: ERRORS
      };
    }
}