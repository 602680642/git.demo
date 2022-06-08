import React from 'react'
import {notification,Modal,Button} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePublish  from '../../../../../src/usePublish.js'
import axios from 'axios'
import NewsPublish from '../copublish'

const { confirm } = Modal
export default function UnPublish() {

  const {dataSource,setdataSource} = usePublish(1)
  /*const handleunPublish = (items) =>{

    confirm({
      title: 'Do you Want to publish this news?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        setdataSource(dataSource.filter(data => data.id !== items.id))
        //补丁修改
        axios.patch(`/news/${items.id}`,
        
        {'publishState' : 2,'auditState' : 2}).then(res =>{

        notification.info({

          message:'通知',
          description:'此新闻已发布,请在【发布管理/已发布】中查看',
          placement:'bottomRight'
        })
        })
      },
      onCancel() {
        
      },
    });
    
  }
  
  return (
    <div>

     <NewsPublish dataSource = {dataSource} handleunPublish = {handleunPublish} button={<Button type='primary'>发布</Button>}/>
    </div>
  )
}
