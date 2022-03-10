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
  }
    if (userRequest) {

      const { name, email, password, admin } = userRequest;
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
      
      const EMAIL_ERROR = (!!get(ERRORS, 'email') && 'email' || '');
      const NAME_ERROR = (!!get(ERRORS, 'name') && 'name' || '');
      const PASSWORD_ERROR = (!!get(ERRORS, 'password') && 'password' || '');

      // console.log(CPF_ERROR);
      // console.log(PASSWORD_ERROR);
      // console.log(NAME_ERROR);
      // console.log(USERNAME_ERROR);
      // console.log(EMAIL_ERROR);

      let error: any =  EMAIL_ERROR
        || NAME_ERROR
        || PASSWORD_ERROR
        || '';

      const ok = error === '';
      return {
        ok: ok,
        error: error,
        errors: ERRORS
      };
    }
}