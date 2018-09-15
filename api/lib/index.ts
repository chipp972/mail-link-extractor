import { errorResponse, successResponse } from './express-response';
import getLogger from './logger';

export default async function getLib() {
  const lib: Lib = {
    logger: getLogger(),
    errorResponse,
    successResponse,
  };
  return lib;
}
