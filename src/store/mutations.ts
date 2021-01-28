import {SETDOT} from './mutation-type'
import Vue from 'vue'
export default{
    [SETDOT](state,dotObj){
       try {
        let temp = dotObj['dotObj']
        let key = (Object.keys(temp))[0]

        Vue.set(state.dotObj,key,temp[key])
       
       } catch (error) {
           
       }
    }
}