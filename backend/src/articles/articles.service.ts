import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../database/entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

/** Build a URL-safe slug; keeps Arabic letters, collapses whitespace to dashes. */
function slugify(input: string): string {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articles: Repository<Article>,
  ) {}

  // ── Public ───────────────────────────────────────────
  async listPublished(limit = 20, offset = 0) {
    const take = Math.min(Math.max(limit, 1), 100);
    const [items, total] = await this.articles.findAndCount({
      where: { status: 'published' },
      order: { published_at: 'DESC', created_at: 'DESC' },
      take,
      skip: Math.max(offset, 0),
    });
    return { items, total };
  }

  async getPublishedBySlug(slug: string) {
    const article = await this.articles.findOne({
      where: { slug, status: 'published' },
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  // ── Admin ────────────────────────────────────────────
  async listAll(limit = 50, offset = 0) {
    const take = Math.min(Math.max(limit, 1), 100);
    const [items, total] = await this.articles.findAndCount({
      order: { created_at: 'DESC' },
      take,
      skip: Math.max(offset, 0),
    });
    return { items, total };
  }

  async getById(id: string) {
    const article = await this.articles.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  /**
   * External ingest (n8n / automation). Upserts by slug: if the provided slug
   * already exists, the article is updated; otherwise a new one is created.
   * Without a slug it always creates (deriving + de-duplicating from title_ar).
   */
  async ingest(dto: CreateArticleDto) {
    if (dto.slug) {
      const slug = slugify(dto.slug);
      if (slug) {
        const existing = await this.articles.findOne({ where: { slug } });
        if (existing) return this.update(existing.id, dto);
      }
    }
    return this.create(dto);
  }

  async create(dto: CreateArticleDto) {
    const slug = await this.resolveSlug(dto.slug || dto.title_ar);
    const status = dto.status ?? 'draft';

    const article = this.articles.create({
      slug,
      title_ar: dto.title_ar,
      title_en: dto.title_en ?? null,
      excerpt_ar: dto.excerpt_ar ?? null,
      excerpt_en: dto.excerpt_en ?? null,
      content_ar: dto.content_ar ?? '',
      content_en: dto.content_en ?? null,
      cover_url: dto.cover_url ?? null,
      status,
      published_at: status === 'published' ? new Date() : null,
    });

    return this.articles.save(article);
  }

  async update(id: string, dto: UpdateArticleDto) {
    const article = await this.getById(id);

    if (dto.slug !== undefined) {
      article.slug = await this.resolveSlug(dto.slug || article.title_ar, id);
    }
    if (dto.title_ar !== undefined) article.title_ar = dto.title_ar;
    if (dto.title_en !== undefined) article.title_en = dto.title_en || null;
    if (dto.excerpt_ar !== undefined) article.excerpt_ar = dto.excerpt_ar || null;
    if (dto.excerpt_en !== undefined) article.excerpt_en = dto.excerpt_en || null;
    if (dto.content_ar !== undefined) article.content_ar = dto.content_ar ?? '';
    if (dto.content_en !== undefined) article.content_en = dto.content_en || null;
    if (dto.cover_url !== undefined) article.cover_url = dto.cover_url || null;

    if (dto.status !== undefined && dto.status !== article.status) {
      article.status = dto.status;
      // Stamp publish time the first time it goes live.
      if (dto.status === 'published' && !article.published_at) {
        article.published_at = new Date();
      }
    }

    return this.articles.save(article);
  }

  async remove(id: string) {
    const result = await this.articles.delete({ id });
    if (!result.affected) throw new NotFoundException('Article not found');
  }

  /** Ensure the slug is non-empty and unique (ignoring the row being updated). */
  private async resolveSlug(source: string, ignoreId?: string) {
    const base = slugify(source);
    if (!base) throw new BadRequestException('Could not derive a slug');

    let candidate = base;
    let n = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const clash = await this.articles.findOne({
        where: { slug: candidate },
      });
      if (!clash || clash.id === ignoreId) return candidate;
      candidate = `${base}-${++n}`;
    }
  }
}
