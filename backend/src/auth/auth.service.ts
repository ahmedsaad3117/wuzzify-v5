import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../database/entities/admin.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Admin) private readonly admins: Repository<Admin>,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /** Seed the first admin from env vars if no admin exists yet. */
  async onModuleInit(): Promise<void> {
    const email = this.config.get<string>('ADMIN_EMAIL');
    const password = this.config.get<string>('ADMIN_PASSWORD');
    if (!email || !password) return;

    const existing = await this.admins.findOne({ where: { email } });
    if (existing) return;

    const password_hash = await bcrypt.hash(password, 10);
    await this.admins.save(
      this.admins.create({
        email,
        password_hash,
        name: this.config.get<string>('ADMIN_NAME') ?? null,
      }),
    );
    this.logger.log(`Seeded admin account: ${email}`);
  }

  async login(email: string, password: string) {
    const admin = await this.admins.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.signAsync({
      sub: admin.id,
      email: admin.email,
    });

    return {
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  async me(id: string) {
    const admin = await this.admins.findOne({ where: { id } });
    if (!admin) throw new UnauthorizedException();
    return { id: admin.id, email: admin.email, name: admin.name };
  }
}
