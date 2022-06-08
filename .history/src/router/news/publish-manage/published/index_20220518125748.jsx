import React,{useEffect,useState} from 'react'
import {Table,Button} from 'antd'
import { CheckOutlined, CloseOutlined} from '@ant-design/icons';

import axios from 'axios'
export default function Publish() {
  const [dataSource,setdataSource] =useState([])
  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  
  useEffect(()=>{

    axios.get('/news?auditState=1&_expand=categroy').then(res =>{
      
       const list = res.data
      // console.log(res.data);
      //如果是超级管理员就渲染全部数据，如果不是就渲染权限内部分数据
      setdataSource(roleId === 1 ? list : [...list.filter(item => item.author === username),
        ...list.filter(item => item.region === region && item.roleId===3)
      ])
    })
 },[roleId,region,username])

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
    dataIndex:'categroy',
    
  },


  {
    title: '操作',

    render: (items) => {

      return <div>
        <Button type='primary' onClick={() => {handle}} shape='circle' icon={<CheckOutlined />} style={{ marginRight: '10px' }} />

        <Button danger shape='circle' icon={<CloseOutlined />} onClick={() => {

        }}
        />

      </div>
    }
  },
];
  return (
    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
  )
}
