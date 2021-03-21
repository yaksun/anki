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
        data.data =resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }


    public async addCate(params){
        let network = new CategoryNetwork()
        let startDateTime = new Date().getTime();
        const resultData:any = await network.addCate(params)
        let endDateTime = new Date().getTime();

        let data = new cate_result_model();
        data.code = resultData.code;
        data.data = resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }

    public async updCate(params){
        let network = new CategoryNetwork()
        let startDateTime = new Date().getTime();
        const resultData:any = await network.updCate(params)
        let endDateTime = new Date().getTime();

        let data = new cate_result_model();
        data.code = resultData.code;
        data.data =resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }

    public async delCate(params){
        let network = new CategoryNetwork()
        let startDateTime = new Date().getTime();
        const resultData:any = await network.delCate(params)
        let endDateTime = new Date().getTime();

        let data = new cate_result_model();
        data.code = resultData.code;
        data.data = resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }

    public async findCate(params){
        let network = new CategoryNetwork()
        let startDateTime = new Date().getTime();
        const resultData:any = await network.findCate(params)
        let endDateTime = new Date().getTime();

        let data = new cate_result_model();
        data.code = resultData.code;
        data.data = resultData;
        data.message = resultData.message;
        data.expendTime = endDateTime - startDateTime;

        return data;
    }
}