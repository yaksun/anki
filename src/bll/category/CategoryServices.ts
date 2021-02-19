import {CategoryNetwork} from '@/network/category/CategoryNetwork'
import {cate_result_model,cate_result_model_detail} from '@/model/category/cate_result_model'

export class CategoryServices{
    public async getCateList(params){
        let network = new CategoryNetwork()
        let startDateTime = new Date().getTime();
        const resultData:any = await network.getCateList(params)
        let endDateTime = new Date().getTime();

        let data = new cate_result_model();
        data.code = resultData.code;
        data.data = <cate_result_model_detail[]>resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }
}