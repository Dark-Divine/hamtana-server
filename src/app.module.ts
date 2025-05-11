import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigFactory } from './base';
import typeorm from './base/configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigFactory }),

    AuthModule,
    UserModule,
    // StoreModule,
    // CourseModule,
    // OrderModule,
    // TicketModule,
    // WalletModule,
    // PaymentModule,
    // NotificationModule,
    // UploadModule,
    // PostModule,
    // SocialModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
