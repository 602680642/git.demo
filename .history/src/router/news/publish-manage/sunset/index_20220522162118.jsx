import React from 'react'
import {notification,Button} from 'antd'

import usePublish  from '../../../../../src/usePublish.js'
import axios from 'axios'
import NewsPublish from '../copublish'



export default function PublishSunset() {

  const {dataSource,setdataSource} = usePublish(3)
  const handleNews = (items) =>{

    setdataSource(dataSource.filter(data => data.id !== items.id))
    axios.patch(`/news/${items.id}`,{'publishState' : 0,'auditState' : 0}).then(res =>{

    notification.info({

      message:'通知',
      description:'此新闻已存至草稿箱,请在【新闻管理/草稿箱】中查看',
      placement:'bottomRight'
    })
    })
}
  
  return (
    <div>
      
     <NewsPublish dataSource={dataSource} handleNews={handleNews} button={<Button type='primary'>发送草稿箱</Button>}></NewsPublish>
    </div>
  )  
}

