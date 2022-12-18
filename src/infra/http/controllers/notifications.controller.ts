import { CancelNotification } from '@application/entities/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/entities/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/entities/use-cases/get-recipient-notification';
import { ReadNotification } from '@application/entities/use-cases/read-notification';
import { UnreadNotification } from '@application/entities/use-cases/unread-notification';
import { Get, Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/entities/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notification')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel') //Método Patch serve para alterar algo especifico, um valor especifico
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }
  @Patch(':id/read') //Método Patch serve para alterar algo especifico, um valor especifico
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread') //Método Patch serve para alterar algo especifico, um valor especifico
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHttp(notification), //Mapper criado para agrupar retorno de dados e manter uma arquitetura limpa e adaptável
    };
  }
}
