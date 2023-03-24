import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { IAuthDataToken, IToken } from '../domain/auth.domain';
import { IAuthService } from '../domain/auth.service';

@Injectable()
export class JWTService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: IAuthDataToken): Promise<IToken> {
    const payload = { ...user };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async validate(token: string): Promise<IAuthDataToken> {
    await this.jwtService.verifyAsync(token);
    const userData = (await this.jwtService.decode(token)) as IAuthDataToken;
    return userData;
  }
}
