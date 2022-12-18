import { Content } from '@application/entities/content';
import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createAt: notification.createAt,
      cancelAt: notification.cancelAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        createdAt: raw.createAt,
        canceledAt: raw.cancelAt,
      },
      raw.id,
    );
  }
}
