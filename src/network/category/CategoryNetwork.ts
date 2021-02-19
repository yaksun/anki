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
}