import axios from 'axios'

/**
 * 拆分json  参数为 query
 * @param query
 */
const getQuery = function (query: any) {
  if (query == null || query == "") {
    return "";
  }
  let str = "";
  for (const item in query) {
    str += (str.length > 0 ? "&" : "") + item + "=" + query[item];
  }
  return str;
};

export const httpAsync=(
    baseUrl: string,
    url: string,
    method = "get",
    params: any = {},
    queryParams: any = {}
)=>{

    const Method = method.toLowerCase() ; //请求方式
    const getParams = Method === "get" ? params : {}; //get参数
    const postParams = Method === "post" ? params : {}; //post参数

    const queryPath = getQuery(queryParams);
    if (
      queryPath != undefined &&
      queryPath != queryParams &&
      queryPath.length > 0
    ) {
      url = url + "?" + queryPath;
    }

    let headers: any = sessionStorage.getItem("headers");
    headers = headers == null || headers == "" ? "{}" : headers;
    headers = JSON.parse(headers);

 
    return new Promise((resolve, reject) => {
      axios({
      method:(Method as any),
      url: baseUrl + url, //url地址
      params: getParams, //get参数
      data: postParams, //post参数
      headers: headers
      }).then((res: any)=>resolve(res.data))
      .catch((err: any)=>reject(err))
    });

}


