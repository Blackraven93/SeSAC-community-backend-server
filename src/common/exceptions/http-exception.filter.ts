import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

interface OriginError {
  error: string;
  statusCode: number;
  message: string | string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | string[];
    // res.status(400).send({error message}:json)
    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        statusCode: status,
        timestamp: new Date().toString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        success: false,
        statusCode: status,
        timestamp: new Date().toString(),
        ...error,
      });
    }
  }
}
