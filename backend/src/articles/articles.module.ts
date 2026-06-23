import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../database/entities/article.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ApiKeyGuard } from './api-key.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), AuthModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ApiKeyGuard],
})
export class ArticlesModule {}
