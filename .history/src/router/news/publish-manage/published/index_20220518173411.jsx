import React,{useEffect,useState} from 'react'
import {Table,Button,notification,Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import axios from 'axios'
const { confirm } = Modal
export default function Publish(props) {

  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=categroy`
    ).then(res =>{

        console.log(res.data)
        setdataSource(res.data)
    })

  },[username])

  const handleback = (items) =>{
  
     setdataSource(dataSource.filter(data => data.id !== items.id))

     //补丁修改
     axios.patch(`/news/${items.id}`,
     
     {auditState : 0}).then(res =>{

      notification.info({

        message:'通知',
        description:'您可以到草稿箱中查看您的新闻',
        placement:'bottomRight'
      })
     })
  }
  //发布
  const handlePublish = (items) =>{

    confirm({
      title: 'Do you Want to publish this news?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        props.history.push('/publish-manage/published')
        //补丁修改
        axios.patch(`/news/${items.id}`,
        
        {'publishState' : 2,'publishTime':Date.now()}).then(res =>{

        notification.info({

          message:'通知',
          description:'您可以到【发布管理/已发布】中查看您的新闻',
          placement:'bottomRight'
        })
        })
      },
      onCancel() {
        
      },
    });
    
  }
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,items)=> <Button type ='link' href={`/news-manage/preview/${items.id}`}>{title}</Button>
    },
    {
      title: '作者',
      dataIndex: 'author',
     
    },
    {
      title: '新闻分类',
      dataIndex: 'categroy',
      
    },

    
    {
      title: '操作',
      
      render:(items)=>{
        
        return <div>
          {

             <Button type='primary'  onClick={()=> {handlePublish(items)}}>xia'xia</Button>
          }
           
        </div>
      }
    },
  ];
  return (

    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>

  )  
}
