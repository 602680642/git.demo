import React,{useEffect,useState} from 'react'
import {Table,Button} from 'antd'
import axios from 'axios'
export default function Publish() {
  const [dataSource,setdataSource] =useState([])
  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  
  useEffect(()=>{

    axios.get('/news?auditState=1&_expand=categroy').then(res =>{
      
       const list = res.data
      // console.log(res.data);
      //如果是超级管理员就渲染全部数据，如果不是就渲染权限内部分数据
      setdataSource(roleId === 1 ? list : [...list.filter(item => item.username === username),
        ...list.filter(item => item.region === region && item.roleId===3)
      ])
    })
 },[roleId,region,username])

 const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (id) => <b>{id}</b>
  },
  {
    title: '权限名称',
    dataIndex: 'roleName',

  },

  {
    title: '操作',

    render: (items) => {

      return <div>
        <Button danger onClick={() => delItem(items)} shape='circle' icon={<DeleteOutlined />} style={{ marginRight: '10px' }} />

        <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={() => {

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
