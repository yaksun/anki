const CategoryAPIS ={
    cate_list:{
        baseUrl: "/",
        url: "api/cate",
        method: "get",
    },
    add_cate:{
        baseUrl:'/',
        url:'api/cate',
        method:'post'
    },
    del_cate:{
        baseUrl:'/',
        url:'api/cate/del',
        method:'post'
    }

}

export {CategoryAPIS}