export const AUTH_INIT_ERRORS = {
  CHECK_USER_EXISTENCE: 'CHECK_USER_EXISTENCE.',
  CREATE_USER: 'CREATE_USER',
  AUTH_LISTENER: 'AUTH_LISTENER',
  UNKNOWN: 'UNKNOWN',
} as const;

export type AuthInitErrorCode = keyof typeof AUTH_INIT_ERRORS;

export class AuthInitError extends Error {
  code: AuthInitErrorCode;
  constructor(code: AuthInitErrorCode) {
    super();
    this.code = code;
  }
}
