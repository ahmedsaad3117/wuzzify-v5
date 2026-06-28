import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  sessionId?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4000)
  message!: string;

  // Raw document.cookie string from the customer's browser (best-effort;
  // excludes HttpOnly cookies). Forwarded to n8n.
  @IsOptional()
  @IsString()
  @MaxLength(8000)
  cookies?: string;
}
