import React from 'react'
import {notification,Modal,Button} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePublish  from '../../../../../src/usePublish.js'
import axios from 'axios'
import NewsPublish from '../copublish'

const { confirm } = Modal

export default function Publish() {

  const {dataSource,handlePublish} = usePublish(2,0,3)
  
  
  
  return (
    <div>
      
     <NewsPublish dataSource={dataSource} handlePublish={handlePublish} button={<Button type='primary'>下线</Button>}></NewsPublish>
    </div>
  )  
}
