const HomeAPIS ={
    home_list:{
        baseUrl: "/",
        url: "api/card",
        method: "get",
    },
    add_card:{
        baseUrl: "/",
        url: "api/card",
        method: "post",
    },
    del_card:{
        baseUrl: "/",
        url: "api/card/del",
        method: "post",
    }

}

export {HomeAPIS}