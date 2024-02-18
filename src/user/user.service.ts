import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    async create(user:UserDTO):Promise<User> {
        return await this.userModel.create(user);
    }

    async findOne(id:string):Promise<User>{
        return this.userModel.findOne({id:id}).exec();
    }
}
