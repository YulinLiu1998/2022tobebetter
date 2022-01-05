import Mock from 'mockjs'
import shopDatas from './data.json'
Mock.mock('/api/getShopDatas', { code: 0, data: shopDatas })
