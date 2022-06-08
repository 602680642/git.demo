import React,{useEffect,useState} from 'react'
import {Table,Button,notification,Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import axios from 'axios'
const { confirm } = Modal
export default function Publish(props) {

  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState=3&publishState=1&_expand=categroy`
    ).then(res =>{

        console.log(res.data)
        setdataSource(res.data)
    })

  },[username])

 
  //下线
  const handleUnPublish = (items) =>{

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

             <Button type='primary'  onClick={()=> {handleUnPublish(items)}}>下线</Button>
          }
           
        </div>
      }
    },
  ];
  return (

    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>

  )  
}
