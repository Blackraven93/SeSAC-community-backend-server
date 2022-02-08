import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value < 0)
      throw new HttpException('value must be positive number', 400);
    return value;
  }
}
