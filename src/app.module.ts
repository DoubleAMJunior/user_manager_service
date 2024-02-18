import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './api/user/user.controller';
import { ReqresService } from './reqres/reqres.service';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { UserAvatar, UserAvatarSchema } from './user/user_avatar/user_avatar.schema';
import { UserAvatarService } from './user/user_avatar/user_avatar.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMockEventService } from './rabbit-mock-event/rabbit-mock-event.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'),HttpModule,
            MongooseModule.forFeature([{name:User.name, schema:UserSchema},{name:UserAvatar.name,schema:UserAvatarSchema}]),
          MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com',
        secure: false,
        auth: {
          user: 'user@example.com',
          pass: 'testing',
        },
      },
      defaults: {
        from: '\"No Reply\" <noreply@example.com>',
      },
      template: {
        dir: "",
        adapter: null,
        options: {
          strict: false,
        },
      },
    }),
    ClientsModule.register([
      {
        name: 'MOCK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),

          ],
  controllers: [AppController, UserController],
  providers: [AppService, ReqresService, UserService, UserAvatarService, RabbitMockEventService],
})
export class AppModule {}
