import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    //Realiza a conexão com o kafka
    super({
      client: {
        clientId: 'notifications', //Definindo um nome para o evento
        brokers: ['ruling-newt-8123-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cnVsaW5nLW5ld3QtODEyMyQnH-vwzZ90QPoDxXADMdlkoQKVFIfuwY69mjJlrI4',
          password:
            'OwE59i5FFnXsvDdYLEjlAkDgaIm-RzQzslSp8bHHztKJOu454gU-SfWvW3JMbcSCUO4V5A==',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
