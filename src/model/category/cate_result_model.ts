import {base_model} from '@/model/base_model'

class cate_result_model extends base_model {
    public constructor() {
      super();
    }
  
    /*** 明细数据**/
    public data!: cate_result_model_detail[];
  
    // public detailData!: building_result_model_detail;
  }


  class cate_result_model_detail{
    public id!:Number // id
    public title!:String  // 标题
  
  }


export {
    cate_result_model,
    cate_result_model_detail
}  