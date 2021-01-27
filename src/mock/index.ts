import Mock from 'mockjs'
import { getResult } from './utils'
Mock.mock(/\/list/, 'get', () => {
    const data=[
        {id:1}
    ]

    return getResult(data)

})