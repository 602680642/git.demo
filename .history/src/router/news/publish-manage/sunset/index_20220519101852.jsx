import React from 'react'
import {notification,Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePublish  from '../../../../../src/usePublish.js'
import axios from 'axios'
import NewsPublish from '../copublish'

const { confirm } = Modal

export default function PublishSunset() {

  const {dataSource,setdataSource} = usePublish(3)
  const handlenews = (items) =>{

    
    console.log('11);
    
  }
  
  return (
    <div>
      
     <NewsPublish dataSource={dataSource} handlePublish={handlePublish}></NewsPublish>
    </div>
  )  
}

