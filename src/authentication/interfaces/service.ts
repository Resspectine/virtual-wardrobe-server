import { AuthorizedMethod } from 'src/types';
import { RegisterDto } from '../register.dto';

export interface AuthenticationRegister {
  registrationData: RegisterDto;
}

export interface AuthenticationGetAuthenticatedUser {
  email: string;
  plainTextPassword: string;
}

export interface AuthenticationVerifyPassword {
  plainTextPassword: string;
  hashedPassword: string;
}

export type AuthenticationGetCookieWithJwtToken = AuthorizedMethod;
