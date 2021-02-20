import {SETDOT,SETLIST,SETCATELIST} from './mutation-type'
import Vue from 'vue'
export default{
    [SETDOT](state,dotObj){
       try {
        let temp = dotObj['dotObj']
        let key = (Object.keys(temp))[0]

        Vue.set(state.dotObj,key,temp[key])
       
       } catch (error) {
           
       }
    },
    [SETLIST](state,list){
        state.list = list.sort((n1,n2)=>{
            return n1.nextShowTime - n2.nextShowTime
        }) 
    },
    [SETCATELIST](state,cateList){
        state.cateList = cateList 
    }
}