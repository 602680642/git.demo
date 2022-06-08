import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Button,Modal}from 'antd'
const {confirm} = Modal
export default function List2() {

  const [dataSource,setdataSource] = useState([])
  //动态获取权限列表数据
  useEffect(()=>{

     axios.get('http://localhost:3000/roles').then(res =>{
       
    
       setdataSource(res.data)
     })
  },[])

  
  return (
    <Table dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
