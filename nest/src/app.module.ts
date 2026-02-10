import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qwerty',
      database: 'stroyflow',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ только для dev
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
