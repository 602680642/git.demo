import React from 'react'
import {notification,Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePublish  from '../../../../../src/usePublish.js'
import axios from 'axios'
import NewsPublish from '../copublish'

const { confirm } = Modal

export default function Publish() {

  const {dataSource,setdataSource} = usePublish(2)
  //已发布所有都可以看
  //判断除管理员外的都不能点击下线
  const handlePublish = (items) =>{

    confirm({
      title: 'Do you Want to unpublish this news?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        setdataSource(dataSource.filter(data => data.id !== items.id))
        //补丁修改
        axios.patch(`/news/${items.id}`,
        
        {'auditState' : 0,'publishState':3}).then(res =>{

        notification.info({

          message:'通知',
          description:'此新闻已下线,请在【发布管理/已下线】中查看',
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
      
     <NewsPublish dataSource={dataSource} handlePublish={handlePublish}></NewsPublish>
    </div>
  )  
}
