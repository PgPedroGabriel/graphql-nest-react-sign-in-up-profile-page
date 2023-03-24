import { IToken, IAuthDataToken } from './auth.domain';

export interface IAuthService {
  login(user: IAuthDataToken): Promise<IToken>;
  validate(token: string): Promise<IAuthDataToken>;
}
