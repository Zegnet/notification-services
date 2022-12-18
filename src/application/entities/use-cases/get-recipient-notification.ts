import { Content } from '../content';
import { Notification } from '../notification';
import { NotificationRepository } from '@application/repositories/notification-repositories';
import { Injectable } from '@nestjs/common';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationRepository.findManyById(
      recipientId,
    );

    return {
      notifications,
    };
  }
}
