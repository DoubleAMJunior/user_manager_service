import { Injectable } from '@nestjs/common';
import { HttpService} from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class ReqresService {
    constructor(private readonly httpService:HttpService){}
    async getUser(id){
        return  await firstValueFrom(this.httpService.get('https://reqres.in/api/users/2'))
    }
    async getPic(url){
       return await firstValueFrom(this.httpService.get(url,{responseType:"arraybuffer"}));
    }
}
