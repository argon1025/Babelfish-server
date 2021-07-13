import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.getResponse() as any;

    console.log(errorMessage);
    if (!!errorMessage.msg_code) {
      // Nomal Error
      response.status(status).json({
        error: 'true',
        statusCode: status,
        timestamp: new Date().toISOString(),
        location: request.url,
        msg_code: errorMessage.msg_code,
        msg: errorMessage.msg,
      });
    } else {
      // validation Pipe Error
      response.status(status).json({
        error: 'true',
        statusCode: status,
        timestamp: new Date().toISOString(),
        location: request.url,
        msg_code: errorMessage.msg_code || 'n1-1',
        msg: errorMessage.message,
      });
    }
  }
}
