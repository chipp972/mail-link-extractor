import { Response } from 'express';

export function successResponse(res: Response, data: any): Response {
  return res.status(200).json({
    success: true,
    data,
  });
}

export function errorResponse(res: Response, error: any, status?: number): Response {
  return res.status(status || 500).json({
    success: false,
    error,
  });
}
