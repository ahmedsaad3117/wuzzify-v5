import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  slug?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(300)
  title_ar!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  title_en?: string;

  @IsOptional()
  @IsString()
  excerpt_ar?: string;

  @IsOptional()
  @IsString()
  excerpt_en?: string;

  @IsOptional()
  @IsString()
  content_ar?: string;

  @IsOptional()
  @IsString()
  content_en?: string;

  @IsOptional()
  @IsString()
  cover_url?: string;

  @IsOptional()
  @IsEnum(['draft', 'published'])
  status?: 'draft' | 'published';
}
