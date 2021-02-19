import Mock from 'mockjs'
import { getResult } from './utils'
Mock.mock(/\/list/, 'get', () => {
    const data=[
        {id:1,title:'vue',content:'各会员单位2020年武汉仁爱医院免费为我协会会员单位员工开展免费体检活动以来，已有不少会员单位自行组织与医院开展了免费体检活动，反馈情况较好。2021年武汉仁爱医院将继续免费为我协会会员单位员工开展免费体检活动，并可为参加体检的人员免费办理健康证。请有意向组织本公司员工参加该院免费体检活动的单位，自行与医院联络员联系。现将有关事项通知如下'},
        {id:2,title:'react',content:'reactxx'},
        {id:3,title:'angular',content:'angularxx'},
        {id:4,title:'uniapp',content:'uniappxx'}
       
    ]

    return getResult(data)

})



Mock.mock(/\/catelist/, 'get', () => {
    const data=[
        {id:1,title:'vue'},
        {id:2,title:'react'},
        {id:3,title:'angular'},
        {id:4,title:'uniapp'}
       
    ]

    return getResult(data)

})