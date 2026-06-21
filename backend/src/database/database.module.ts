import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          url: config.getOrThrow<string>('DATABASE_URL'),
          entities: [Article, Admin],
          // Auto schema sync is opt-in via DB_SYNC (handy for local dev).
          synchronize: config.get('DB_SYNC') === 'true',
          ssl: isProd ? { rejectUnauthorized: false } : false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
