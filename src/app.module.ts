import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { CourseModule } from './course/course.module';
import { OrderModule } from './order/order.module';
import { TicketModule } from './ticket/ticket.module';
import { WalletModule } from './wallet/wallet.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { UploadModule } from './upload/upload.module';
import { PostModule } from './post/post.module';
import { SocialModule } from './social/social.module';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),

    AuthModule,
    UserModule,
    StoreModule,
    CourseModule,
    OrderModule,
    TicketModule,
    WalletModule,
    PaymentModule,
    NotificationModule,
    UploadModule,
    PostModule,
    SocialModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
