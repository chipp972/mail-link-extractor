import { errorResponse, successResponse } from './express-response';

describe('express response', () => {
  it('should set the res object for success', () => {
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const data = { test: 'test' };
    successResponse(res, data);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data,
    });
  });

  it('should set the res object for failure', () => {
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const error = new Error('test');
    errorResponse(res, error, 400);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error,
    });
  });
});
