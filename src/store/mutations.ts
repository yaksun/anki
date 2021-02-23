import {
    SETDOT,
    SETLIST,
    SETCATELIST,
    DELCARD,
    ADDCARD,
    UPDCARD,
    ADDCATE,
    DELCATE,
    UPDCATE
} from './mutation-type'
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
    },
    [DELCARD](state,id){
        state.list = state.list.filter(item=>item.id != id)
    },
    [ADDCARD](state,item){
         state.list.push(item)
    },
    [UPDCARD](state,params){
        let index = state.list.findIndex(item=>item.id===params.id)
        state.list.splice(index,1,params)
    },   
    [ADDCATE](state,item){
        state.cateList.push(item)
    },
    [DELCATE](state,id){
        state.cateList = state.cateList.filter(item=>item.id != id)
    },
    [UPDCATE](state,params){
        let index = state.cateList.findIndex(item=>item.id===params.id)
        state.cateList.splice(index,1,params)
    }   
}