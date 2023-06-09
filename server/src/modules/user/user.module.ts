import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolver/user.resolver';
import { APP_PIPE } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { UserService } from './services/user.service';
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from './db/repositories/user.repository';
import { KnexModule } from 'nest-knexjs';
import { AuthModule } from '../auth/auth.module';

dotenv.config();
export const USER_SERVICE_TOKEN = 'USER_SERVICE_TOKEN';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      formatError: (error) => ({
        message: error.message,
        code: error.extensions?.code || null,
        details: error.extensions?.originalError || null,
      }),
    }),
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          port: +process.env.DB_PORT,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        },
      },
    }),
    SharedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    UserResolver,
    UserRepository,
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ skipMissingProperties: false }),
    },
    {
      provide: USER_SERVICE_TOKEN,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
