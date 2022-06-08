import React from 'react'
import {notification,Modal} from 'antd'
//import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePublish  from '../../../../../src/usePublish.js'
import axios from 'axios'
import NewsPublish from '../copublish'

const { confirm } = Modal

export default function PublishSunset() {

  const {dataSource,setdataSource} = usePublish(3)
  const handleNews = (items) =>{

    setdataSource(dataSource.filter(data => data.id !== items.id))
    axios.patch(`/news/${items.id}`).then(res =>{

    notification.info({

      message:'通知',
      description:'此新闻已下线,请在【发布管理/已下线】中查看',
      placement:'bottomRight'
    })
    })
}
  
  return (
    <div>
      
     <NewsPublish dataSource={dataSource} handleNews={handleNews}></NewsPublish>
    </div>
  )  
}

