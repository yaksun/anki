import { mixin } from "vue/types/umd"

export default {
    unoinList(state){
       let temp = {} 
       state.cateList.forEach(item=>{
           temp[item.id] = item.title 
        })
        let unoinList = state.list.map(mini=>{
            return {
                ...mini,
                 cateName:temp[mini.cateId]
            }
        } )

        return unoinList
    }
}