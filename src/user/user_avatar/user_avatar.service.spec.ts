import { Test, TestingModule } from '@nestjs/testing';
import { UserAvatarService } from './user_avatar.service';
import { UserAvatar } from './user_avatar.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('UserAvatarService', () => {
  let service: UserAvatarService;
  let model: Model<UserAvatar>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAvatarService,
        UserAvatar,
        {
          provide: getModelToken(UserAvatar.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserAvatarService>(UserAvatarService);
    model = module.get<Model<UserAvatar>>(getModelToken(UserAvatar.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
