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
}
