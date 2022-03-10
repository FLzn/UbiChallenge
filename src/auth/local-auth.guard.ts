// region nest
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
//endregion

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}