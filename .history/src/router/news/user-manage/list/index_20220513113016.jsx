import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag,Button,Modal, Popover,Switch}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const {confirm} = Modal
export default function User() {

  const [userData,setUserData] =useState([])

  useEffect(()=>{

    axios.get('http://localhost:3000/rights?_embed=children').then(res =>{
      
     
      setUserData(res.data)
    })
 },[])
  return (
    <Table rowKey = {(items) => items.id} dataSource={userData} columns={columns} pagination = {{pageSize:5}}/>
  )
}
