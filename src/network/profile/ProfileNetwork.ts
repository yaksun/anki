import { httpAsync } from "@/network/axiosHelper";
import {ProfileAPIS}  from '@/api/ProfileApi'

export class ProfileNetwork{
    public async dologin(params): Promise<any>{
        const resultData: any = await  httpAsync(
            ProfileAPIS.login_api.baseUrl,
            ProfileAPIS.login_api.url,
            ProfileAPIS.login_api.method,
            params
        );


        return resultData
    }
}