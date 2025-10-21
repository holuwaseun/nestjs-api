import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import type { T_Error } from '../../types/global';

/**
 * APIError
 */
export default class APIError extends Error {
  statusCode: number;
  status: string;
  code: string;

  /**
   * constructor
   * @param {object} errorType
   */
  constructor(errorType: T_Error) {
    super(errorType.message);
    this.code = errorType.code;
    this.name = this.constructor.name;
    this.status = errorType.status || '';
    this.statusCode = errorType.statusCode as number;
  }
}

export const ERROR_CODES = {
  BAD_REQUEST: 'API_ERR_BAD_REQUEST',
  CANNOT_DELETE_RESOURCE: 'API_ERR_CANNOT_DELETE_RESOURCE',
  DUPLICATE_CONTENT: 'API_ERR_DUPLICATE_CONTENT',
  INVALID_AUTHENTICATION: 'API_ERR_INVALID_AUTHENTICATION',
  INVALID_LOGIN: 'API_ERR_INVALID_LOGIN',
  RESOURCE_NOT_FOUND: 'API_ERR_RESOURCE_NOT_FOUND',
  SOMETHING_WENT_WRONG: 'API_ERR_SOMETHING_WENT_WRONG',
  UNAUTHORIZED: 'API_ERR_UNAUTHORIZED',
  UNAUTHORIZED_SESSION: 'API_ERR_UNAUTHORIZED_SESSION',
};

export const internalServerError = (
  message = 'Something went wrong',
  code = 'API_ERR_SOMETHING_WENT_WRONG',
): T_Error => {
  return {
    code,
    message,
    status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };
};

export const badRequest = (message: string, code: string): T_Error => {
  return {
    code,
    message,
    status: ReasonPhrases.BAD_REQUEST,
    statusCode: StatusCodes.BAD_REQUEST,
  };
};

export const notFound = (message: string, code: string): T_Error => {
  return {
    code,
    message,
    status: ReasonPhrases.NOT_FOUND,
    statusCode: StatusCodes.NOT_FOUND,
  };
};

export const unauthorized = (message: string, code: string): T_Error => {
  return {
    code,
    message,
    status: ReasonPhrases.UNAUTHORIZED,
    statusCode: StatusCodes.UNAUTHORIZED,
  };
};
