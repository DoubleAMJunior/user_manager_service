import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { ReqresService } from 'src/reqres/reqres.service';
import { UserService } from 'src/user/user.service';
import { UserAvatarService } from 'src/user/user_avatar/user_avatar.service';
import * as fs from "node:fs";
import { MailerService } from '@nestjs-modules/mailer';
import { RabbitMockEventService } from 'src/rabbit-mock-event/rabbit-mock-event.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly reqResService:ReqresService,
        private readonly userService:UserService,
        private readonly avatarService:UserAvatarService,
        private readonly mailService:MailerService,
        private readonly rabbitService:RabbitMockEventService){}
    @Post()
    async setUser(@Body() user:UserDTO){
        let userModel=await this.userService.findOne(user.id);
        if(userModel !== null){
            return userModel
        }
        userModel= await this.userService.create(user);
        const mailOptions = {
            to: 'recipient@example.com',
            subject: 'email',
            text: 'This is email is for'+ user.first_name+" "+user.last_name,
          };
      
          try{
          await this.mailService.sendMail(mailOptions);
          
          }catch(e){
            console.log(e);
            console.log("this is because the mailer is mock and no smtp server is provided")
          }
        this.rabbitService.emitEvent();
        return userModel;
    }
    @Get('/:id')
    async getUser(@Param("id") id){
        let res= await this.reqResService.getUser(id);
        return res.data.data;
    }
    @Get('/:id/avatar')
    async getUserAvatar(@Param("id")id ){
        
        let avatarInfo=await  this.avatarService.findOne(id);
        if(avatarInfo == null){
            let userInfo=await this.reqResService.getUser(id);
            let avatar=await this.reqResService.getPic(userInfo.data.data.avatar);
            fs.writeFileSync("./files/"+id+".jpg",avatar.data,{flag:"w"})
            const base64String = btoa(String.fromCharCode(...new Uint8Array(avatar.data)));
            const avatarModel={id:id,hash:base64String};
            avatarInfo=await this.avatarService.create(avatarModel);
        }

        return avatarInfo.hash;
    }
    @Delete('/:id/avatar')
    async removeAvatar(@Param("id") id){
        let result=await this.avatarService.delete(id);
        if(result === null)
            return;
        fs.unlink("./files/"+id+".jpg",err=>{
            if(err !== null)
                console.log(err);
        })
    }
}
