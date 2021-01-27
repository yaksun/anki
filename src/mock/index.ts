import Mock from 'mockjs'
import { getResult } from './utils'
Mock.mock(/\/list/, 'get', () => {
    const data={
        code:0,
        data:[
            {id:1}
        ]
    }

    return getResult(data)

})