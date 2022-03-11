import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "src/custom-decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { AuthService } from "./auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    // descobrir a role requisitada
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }
    // console.log(context.switchToHttp().getRequest().headers)

    const { authorization } = context.switchToHttp().getRequest().headers;
    const authToken = authorization.split(' ')[1];
    const user: any = this.authService.getJwt(authToken);

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}