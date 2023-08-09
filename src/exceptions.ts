import { Res } from '@nestjs/common';
import { Response } from 'express';

export class Exceptions {
  StatusOk(message: string, result: any, @Res() response?: Response) {
    return response.status(200).json({
      status: true,
      message: message,
      data: result,
    });
  }

  InternalServerError(result: any, @Res() response?: Response) {
    return response.status(500).json({
      status: false,
      message: 'Internal Server Error',
      data: result,
    });
  }

  NotFoundExceptions(message: string, result: any, @Res() response?: Response) {
    if (message === '') {
      message = 'Data Not Found';
    }

    return response.status(500).json({
      status: false,
      message: message,
      data: null,
    });
  }
}
