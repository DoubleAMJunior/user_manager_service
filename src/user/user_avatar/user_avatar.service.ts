import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAvatar } from './user_avatar.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserAvatarService {
    constructor(@InjectModel(UserAvatar.name)private avatarModel:Model<UserAvatar>){}

    async create(user:UserAvatar):Promise<UserAvatar> {
        return await this.avatarModel.create(user);
    }

    async findOne(id:string):Promise<UserAvatar>{
        return this.avatarModel.findOne({id:id}).exec();
    }

    async delete(id:string){
        return this.avatarModel.findOneAndDelete({id:id}).exec();
    }
}
