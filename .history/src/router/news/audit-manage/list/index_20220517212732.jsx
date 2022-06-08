import React,{useEffect,useState} from 'react'
import {Table,Button,Tag} from 'antd'
import axios from 'axios'
export default function AuditList() {

  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=categroy`
    ).then(res =>{

        console.log(res.data)
        setdataSource(res.data)
    })

  },[username])

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
      title: '审核状态',
      dataIndex: 'auditState',
      const list = ['草稿箱','审核中','已通过','未通过']
      render:(auditState)=> <Tag color = 'blue'>{auditState}</Tag>
    },
    {
      title: '操作',
      
      render:(items)=>{

        return <div>
           <Button type='primary'  onClick={()=> {}}   style = {{marginRight:'10px'}}>{items.publishState}</Button>
           
        </div>
      }
    },
  ];
  return (

    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>

  )  
}
