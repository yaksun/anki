const CategoryAPIS ={
    cate_list:{
        baseUrl: "http://localhost:3000",
        url: "/cate",
        method: "get",
    },
    add_cate:{
        baseUrl:'http://localhost:3000',
        url:'/addCate',
        method:'post'
    }

}

export {CategoryAPIS}