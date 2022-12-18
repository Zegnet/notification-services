import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { HttpModule } from './http/controllers/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [HttpModule, DataBaseModule, MessagingModule],
})
export class AppModule {}
