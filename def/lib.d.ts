import { Response } from 'express';
import { Logger } from 'winston';

declare global {
  interface Lib {
    logger: Logger;
    authErrorResponse: (res: Response, error: any) => Response;
    errorResponse: (res: Response, error: any) => Response;
    successResponse: (res: Response, error: any) => Response;
    userErrorResponse: (res: Response, error: any) => Response;
  }
}
