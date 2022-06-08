import React from 'react'
import {Button} from 'antd'

import usePublish  from '../../../../../src/usePublish.js'

import NewsPublish from '../copublish'



export default function Publish() {

  const {dataSource,handlePublish} = usePublish(2)
  
  
  
  return (
    <div>
      
     <NewsPublish dataSource={dataSource}  button={(id)=><Button type='primary' onClick={handlePublish}>下线</Button>}></NewsPublish>
    </div>
  )  
}
