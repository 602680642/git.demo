import React from 'react'
import {notification,Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import usePublish  from '../../../../../src/usePublish.js'
import axios from 'axios'
//import coPublish from '../copublish'

const { confirm } = Modal

  
  const handlePublish = (items) =>{

    confirm({
      title: 'Do you Want to unpublish this news?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        setdataSource(dataSource.filter(data => data.id !== items.id))
        //补丁修改
        axios.patch(`/news/${items.id}`,
        
        {'auditState' : 0}).then(res =>{

        notification.info({

          message:'通知',
          description:'此新闻已下线,请在草稿箱中查看',
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
     <coPublish dataSource = {dataSource} handlePublish = {handlePublish}></coPublish>
    </div>
  )  
}
