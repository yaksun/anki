import {base_model} from '@/model/base_model'

class home_result_model extends base_model {
    public constructor() {
      super();
    }
  
    /*** 明细数据**/
    public data!: home_result_model_detail[];
  
    // public detailData!: building_result_model_detail;
  }


  class home_result_model_detail{
    public id!:Number // id
    public cateId!:Number  // 分类id
    public title!:String  // 标题
    public content!:String   // 内容
    public leavel!:Number  // 等级
    public nextShowTime!:Number  // 展示时间
    public lastShowTime!:Number  // 展示时间
  }


export {
    home_result_model,
    home_result_model_detail
}  