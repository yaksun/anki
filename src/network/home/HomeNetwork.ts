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


        return resultData
    }

    public async addCard(params): Promise<any>{
        const resultData: any = await  httpAsync(
            HomeAPIS.add_card.baseUrl,
            HomeAPIS.add_card.url,
            HomeAPIS.add_card.method,
            params
        );


        return resultData
    }


    public async updCard(params): Promise<any>{
        const resultData: any = await  httpAsync(
            HomeAPIS.add_card.baseUrl,
            HomeAPIS.add_card.url+'/'+params.id,
            HomeAPIS.add_card.method,
            params
        );


        return resultData
    }


    public async delCard(params): Promise<any>{
        const resultData: any = await  httpAsync(
            HomeAPIS.del_card.baseUrl,
            HomeAPIS.del_card.url+'/'+params,
            HomeAPIS.del_card.method,
            params
        );


        return resultData
    }
}