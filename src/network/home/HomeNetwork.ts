import { httpAsync } from "@/network/axiosHelper";
import {HomeAPIS}  from '@/api/HomeApi'
export class HomeNetwork{
    public async getHomeList(params): Promise<any>{
        const resultData: any = await  httpAsync(
            HomeAPIS.home_list.baseUrl,
            HomeAPIS.home_list.url,
            HomeAPIS.home_list.method,
            params
        );

        console.log(resultData,'---------')

        return resultData
    }
}