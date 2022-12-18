import { SendNotification } from '@application/entities/use-cases/send-notification';
import { DataBaseModule } from '@infra/database/database.module';
import { NotificationsController } from '@infra/messaging/kafka/controllers/notifications.controllers';
import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';

@Module({
  imports: [DataBaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
