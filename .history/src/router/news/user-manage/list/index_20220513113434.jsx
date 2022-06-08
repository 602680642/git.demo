import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag,Button,Modal, Popover,Switch}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const {confirm} = Modal
export default function User() {

  const [userData,setUserData] =useState([])

  useEffect(()=>{

    axios.get('http://localhost:3000/users?_embed=children').then(res =>{
      
     
      setUserData(res.data)
    })
 },[])

 const delItem = (items) =>{
    
  confirm({
    title: 'Do you Want to delete this item?',
    icon: <ExclamationCircleOutlined />,
    
    onOk() {
     
        //删除后要与后台同步
      setdataSource(dataSource.filter(item => item.id !== items.id))
      axios.delete(`http://localhost:3000/roles/${items.id}`)
       
    },
    onCancel() {
      console.log('Cancel');
    },
  });

 }
  return (
    <Table rowKey = {(items) => items.id} dataSource={userData} columns={columns} pagination = {{pageSize:5}}/>
  )
}
