import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAdminGuard } from '../auth/jwt-admin.guard';
import { ApiKeyGuard } from './api-key.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articles: ArticlesService) {}

  // ── Public ───────────────────────────────────────────
  @Get()
  list(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.articles.listPublished(
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined,
    );
  }

  @Get('by-slug/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.articles.getPublishedBySlug(slug);
  }

  // ── External ingest (API key) — for n8n / automation ──
  @UseGuards(ApiKeyGuard)
  @Post('ingest')
  ingest(@Body() dto: CreateArticleDto) {
    return this.articles.ingest(dto);
  }

  // ── Admin ────────────────────────────────────────────
  @UseGuards(JwtAdminGuard)
  @Get('admin/all')
  adminList(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.articles.listAll(
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined,
    );
  }

  @UseGuards(JwtAdminGuard)
  @Get('admin/:id')
  adminGet(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.articles.getById(id);
  }

  @UseGuards(JwtAdminGuard)
  @Post('admin')
  create(@Body() dto: CreateArticleDto) {
    return this.articles.create(dto);
  }

  @UseGuards(JwtAdminGuard)
  @Patch('admin/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articles.update(id, dto);
  }

  @UseGuards(JwtAdminGuard)
  @Delete('admin/:id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.articles.remove(id);
  }
}
