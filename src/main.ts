import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const kafkaConsumerService = app.get(KafkaConsumerService);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
