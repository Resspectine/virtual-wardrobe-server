import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './tokenPayload.interface';
import { UsersService } from 'src/user/user.service';
import {
  AuthenticationGetAuthenticatedUser,
  AuthenticationGetCookieWithJwtToken,
  AuthenticationRegister,
  AuthenticationVerifyPassword,
} from './interfaces/service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register({ registrationData }: AuthenticationRegister) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdUser = await this.usersService.create({
        userData: {
          ...registrationData,
          password: hashedPassword,
        },
      });

      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser({
    email,
    plainTextPassword,
  }: AuthenticationGetAuthenticatedUser) {
    try {
      const user = await this.usersService.getByEmail({ email });

      await this.verifyPassword({
        hashedPassword: user.password,
        plainTextPassword: plainTextPassword,
      });

      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword({
    hashedPassword,
    plainTextPassword,
  }: AuthenticationVerifyPassword) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken({
    userId,
  }: AuthenticationGetCookieWithJwtToken) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; SameSite=None; Secure; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; SameSite=None; Secure; HttpOnly; Path=/; Max-Age=0`;
  }
}
