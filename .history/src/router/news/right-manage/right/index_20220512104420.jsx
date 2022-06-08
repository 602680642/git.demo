import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table}from 'antd'
export default function Right() {

   const [dataSource,setdataSource] = useState([])
   
   useEffect(()=>{

      axios.get('http://localhost:3000/rights').then(res =>{

        setdataSource(res.data)
      })
   },[])

   const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        render:(id)=>{<b>{id}</b>}
      },
      {
        title: '路径名称',
        dataIndex: 'title',
       
      },
      {
        title: '权限控制',
        dataIndex: 'role',
        
      },

      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
      },
    ];
  return (

    
    <Table dataSource={dataSource} columns={columns} />
  )
}
