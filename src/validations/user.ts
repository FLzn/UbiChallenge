// import { UpdateUserDto } from "src/users/dto/update-user.dto";
// import { CreateUserDto } from "src/users/dto/create-user.dto";
import { get } from 'lodash';
// import UserErrorsDto from "../users/dto/user-errors.dto";

import { CreateUserDto } from "src/users/dtos/create-user.dto";
import UserErrorsDto from "src/users/dtos/user-errors.dtos";

export async function validateUser(userRequest: CreateUserDto, usersModel: any): Promise<any> {
  const ERRORS: any = {
    email: '',
    name: '',
    password: '',
    role: ''
  }
    if (userRequest) {

      const { name, email, password, role } = userRequest;
      // validar se não existe no banco
      const userEmail = await usersModel.findOne({
        where: {
          email: userRequest.email
        }
      });

      if (userEmail) ERRORS.email = 'Email do usuário encontrado no sistema!';
  
      const diffPassword: string = password.replace(/[^\s*]/g, '');
      const diffEmail: string = email.replace(/[^\s*]/g, '');
      const diffName: string = name.replace(/[a-zA-Z~´^ \-]*/g, '');

      if (diffPassword) {
        ERRORS.password = 'Senha inválida.';
      };
      if (diffEmail) {
        ERRORS.email = 'Email inválido.';
      };
      if (diffName) {
        ERRORS.name = 'Nome inválido.';
      };
      if (role !== 'admin' && role !== 'user') {
        ERRORS.role = 'Cargo inválido. Valores válidos: (user, admin).';
      }
      
      const EMAIL_ERROR = (!!get(ERRORS, 'email') && 'email' || '');
      const NAME_ERROR = (!!get(ERRORS, 'name') && 'name' || '');
      const PASSWORD_ERROR = (!!get(ERRORS, 'password') && 'password' || '');
      const ROLE_ERROR = (!!get(ERRORS, 'role') && 'role' || '');

      // console.log(CPF_ERROR);
      // console.log(PASSWORD_ERROR);
      // console.log(NAME_ERROR);
      // console.log(USERNAME_ERROR);
      // console.log(EMAIL_ERROR);

      let error: any =  EMAIL_ERROR
        || NAME_ERROR
        || PASSWORD_ERROR
        || ROLE_ERROR
        || '';

      const ok = error === '';
      return {
        ok: ok,
        error: error,
        errors: ERRORS
      };
    }
}