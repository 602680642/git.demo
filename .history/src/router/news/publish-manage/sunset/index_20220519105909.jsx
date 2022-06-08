import React from 'react'
import {notification,Modal} from 'antd'
//import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePublish  from '../../../../../src/usePublish.js'
//import axios from 'axios'
import NewsPublish from '../copublish'

//const { confirm } = Modal

export default function PublishSunset() {

  const {dataSource} = usePublish(3)
  const handleNews = (items) =>{

    
    notification.info({

      message:'通知',
      description:`您可以到草稿箱中查看您的新闻`,
      placement:'bottomRight'

})
    
}
  
  return (
    <div>
      
     <NewsPublish dataSource={dataSource} handleNews={handleNews}></NewsPublish>
    </div>
  )  
}

