
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


        unoinList = unoinList.sort((n1,n2)=>{
            return n1.nextShowTime - n2.nextShowTime
        })


        return unoinList
    }
}