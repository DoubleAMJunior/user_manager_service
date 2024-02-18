import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMockEventService {
    constructor(@Inject('MOCK_SERVICE') private client: ClientProxy) {}

  async emitEvent() {
    await this.client.emit('mock_event', { message: 'Hello World!' });
  }
}