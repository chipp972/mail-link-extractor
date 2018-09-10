import { Response } from 'express';
import { Logger } from 'winston';

declare global {
  interface Lib {
    logger: Logger;
    errorResponse: (res: Response, error: Error, status?: number) => Response;
    successResponse: (res: Response, data: any) => Response;
  }
}
