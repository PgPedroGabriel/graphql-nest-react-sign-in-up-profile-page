import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolver/user.resolver';
import { APP_PIPE } from '@nestjs/core';
import { UserService } from './services/user.service';
import { CryptoService } from '../shared/services/crypto.service';

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
  ],
  controllers: [],
  providers: [
    UserResolver,
    CryptoService,
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
