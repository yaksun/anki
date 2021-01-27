import Mock from 'mockjs'
import { getResult } from './utils'
Mock.mock(/\/list/, 'get', () => {
    const data=[
        {id:1,title:'vue',content:'vuexx'},
        {id:2,title:'react',content:'reactxx'},
        {id:3,title:'angular',content:'angularxx'},
        {id:4,title:'uniapp',content:'uniappxx'}
       
    ]

    return getResult(data)

})