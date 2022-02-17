import { AuthorizedMethod } from 'src/types';
import { CreateUserDto } from 'src/user/user.dto';

export interface AuthenticationRegister {
  registrationData: CreateUserDto;
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
