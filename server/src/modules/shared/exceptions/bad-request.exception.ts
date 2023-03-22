import { BadRequestException as NestBadRequestException } from '@nestjs/common/exceptions';
export class BadRequestException {
  static throw(message: string) {
    throw new NestBadRequestException([message], {
      cause: new Error(),
      description: 'Bad Request',
    });
  }
}
