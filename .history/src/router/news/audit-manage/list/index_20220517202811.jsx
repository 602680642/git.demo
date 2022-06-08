import React,{useEffect,useState} from 'react'
import {Table} from 'antd'
import axios from 'axios'
export default function AuditList() {

  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource]
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=categroy`
    ).then(res =>{

        console.log(res.data)
    })

  },[username])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id) => <b>{id}</b>
    },
    {
      title: '权限名称',
      dataIndex: 'title',
     
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=> <Tag color = 'blue'>{key}</Tag>
    },

    {
      title: '操作',
      
      render:(items)=>{

        return <div>
           <Button danger  onClick={()=> delItem(items)} shape='circle' icon = {<DeleteOutlined/>} style = {{marginRight:'10px'}}/>
           <Popover  
           title = '页面配置项' 
           trigger={items.pagepermisson === undefined ? '' : 'click'}
           content = {<Switch checked = {items.pagepermisson} onChange={()=> permisson(items)}></Switch>}>
             
           
             <Button type = 'primary' shape='circle' icon = {<EditOutlined/>} disabled = {items.pagepermisson === undefined}/>
           </Popover>
        </div>
      }
    },
  ];
  return (

    <Table dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>

  )  
}
