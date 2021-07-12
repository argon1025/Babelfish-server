import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startedTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request: Request = context.switchToHttp().getRequest();
        // const response: Response = context.switchToHttp().getResponse();

        const url = request.url;
        const method = request.method;
        this.logger.log(`${method} ${url} -> ${Date.now() - startedTime}ms`);
      }),
    );
  }
}
