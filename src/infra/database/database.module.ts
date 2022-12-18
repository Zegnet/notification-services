import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositories/notification-repositories';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNoticationsRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNoticationsRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DataBaseModule {}
