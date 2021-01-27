import {HomeNetwork} from '@/network/home/HomeNetwork'
import {home_result_model,home_result_model_detail} from '@/model/home/home_result_model'

export class HomeServices{
    public async getHomeList(params){
        let network = new HomeNetwork()
        let startDateTime = new Date().getTime();
        const resultData:any = await network.getHomeList(params)
        let endDateTime = new Date().getTime();

        let data = new home_result_model();
        data.code = resultData.code;
        data.data = <home_result_model_detail[]>resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }
}