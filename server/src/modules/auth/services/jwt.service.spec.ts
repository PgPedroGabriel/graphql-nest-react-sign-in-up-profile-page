import { Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { JWTService } from './jwt.service';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

describe('JWTService', () => {
  let jwtService: JWTService;
  let expiresIn = '60s';
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'TEST_SECRET',
          signOptions: { expiresIn },
        }),
      ],
      providers: [JWTService],
    }).compile();

    jwtService = moduleRef.get<JWTService>(JWTService);
  });

  describe('login', () => {
    it('should login and return the accessToken', async () => {
      const token = await jwtService.login({ id: 'dummyId' });
      expect(token).toHaveProperty('accessToken');
      expect(token.accessToken).not.toBeNull();
      expect(token.accessToken).not.toBeUndefined();
    });
  });

  describe('validate', () => {
    it('should return invalid token error', async () => {
      try {
        await jwtService.validate('dummyToken');
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(JsonWebTokenError);
      }
      expiresIn = '2'; // 2 miliseconds to next test
    });

    it('should expires token', async () => {
      const { accessToken } = await jwtService.login({ id: 'dummyId' });
      try {
        await jwtService.validate(accessToken);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(TokenExpiredError);
      }

      expiresIn = '60s';
    });

    it('should return data', async () => {
      const { accessToken } = await jwtService.login({ id: 'dummyId' });
      const data = await jwtService.validate(accessToken);
      expect(data).toHaveProperty('id');
      expect(data.id).toBe('dummyId');
    });
  });
});
