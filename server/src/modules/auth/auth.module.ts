import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JWTService } from './services/jwt.service';

dotenv.config();

const AUTH_JWT_SERVICE_TOKEN = 'AUTH_JWT_SERVICE_TOKEN';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRES },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: AUTH_JWT_SERVICE_TOKEN,
      useClass: JWTService,
    },
  ],
  exports: [
    {
      provide: AUTH_JWT_SERVICE_TOKEN,
      useClass: JWTService,
    },
  ],
})
export class AuthModule {}
