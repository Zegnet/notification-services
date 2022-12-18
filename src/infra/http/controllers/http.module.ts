import { CancelNotification } from '@application/entities/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/entities/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/entities/use-cases/get-recipient-notification';
import { ReadNotification } from '@application/entities/use-cases/read-notification';
import { UnreadNotification } from '@application/entities/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/entities/use-cases/send-notification';
import { DataBaseModule } from 'src/infra/database/database.module';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
