import React from 'react'
import {Button} from 'antd'

import usePublish  from '../../../../../src/usePublish.js'

import NewsPublish from '../copublish'



export default function PublishSunset() {

  const {dataSource,handlePublish} = usePublish(3,0,0)
  
  
  return (
    <div>
      
     <NewsPublish dataSource={dataSource} button={(id)=><Button type='primary' onClick={()=>handleNews(id)}>发送草稿箱</Button>}></NewsPublish>
    </div>
  )  
}

