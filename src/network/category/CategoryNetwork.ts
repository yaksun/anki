import { httpAsync } from "@/network/axiosHelper";
import {CategoryAPIS}  from '@/api/CategoryApi'
export class CategoryNetwork{
    public async getCateList(params): Promise<any>{
        const resultData: any = await  httpAsync(
            CategoryAPIS.cate_list.baseUrl,
            CategoryAPIS.cate_list.url,
            CategoryAPIS.cate_list.method,
            params
        );


        return resultData
    }


    public async addCate(params): Promise<any>{
        const resultData: any = await  httpAsync(
            CategoryAPIS.add_cate.baseUrl,
            CategoryAPIS.add_cate.url,
            CategoryAPIS.add_cate.method,
            params
        );

        return resultData
    }

    public async updCate(params): Promise<any>{
        const resultData: any = await  httpAsync(
            CategoryAPIS.add_cate.baseUrl,
            CategoryAPIS.add_cate.url+'/'+params.id,
            CategoryAPIS.add_cate.method,
            params
        );

        return resultData
    }


    public async delCate(params): Promise<any>{
        const resultData: any = await  httpAsync(
            CategoryAPIS.del_cate.baseUrl,
            CategoryAPIS.del_cate.url+'/'+params,
            CategoryAPIS.del_cate.method,
            params
        );

        return resultData
    }


    public async findCate(params): Promise<any>{
        const resultData: any = await  httpAsync(
            CategoryAPIS.cate_list.baseUrl,
            CategoryAPIS.cate_list.url+'/'+params.id,
            CategoryAPIS.cate_list.method
        );

        return resultData
    }
}