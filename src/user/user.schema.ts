import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument= HydratedDocument<User>;

@Schema()
export class User  
{
    @Prop()
    id:String;
    @Prop()
    email:String;
    @Prop()
    first_name:String;
    @Prop()
    last_name:String;
    @Prop()
    avatar:String;
}

export const UserSchema=SchemaFactory.createForClass(User);