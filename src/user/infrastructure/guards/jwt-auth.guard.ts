import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Ejecutando JwtAuthGuard'); // Log para depuración
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('Resultado de autenticación:', { err, user, info }); // Log detallado
    if (err || !user) {
      throw err || new UnauthorizedException('No autorizado');
    }
    return user;
  }
}
