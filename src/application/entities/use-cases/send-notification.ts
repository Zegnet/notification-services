import { Content } from '../content';
import { Notification } from '../notification';
import { NotificationRepository } from '@application/repositories/notification-repositories';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    //Comunicação para futura persistência de dados
    await this.notificationRepository.create(notification);

    return { notification };
  }
}
