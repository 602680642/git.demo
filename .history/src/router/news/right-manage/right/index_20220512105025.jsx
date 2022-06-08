import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag}from 'antd'
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
        title: '权限名称',
        dataIndex: 'title',
       
      },
      {
        title: '权限路径',
        dataIndex: 'key',
        render:(key)=>{<Tag color = 'blue'>{key}</Tag>}
      },

      {
        title: '操作',
        
        render:()=>{

          return <div>
             <button danger shape='circle' icon = {<De}></button>
             <button></button>
          </div>
        }
      },
    ];
  return (

    
    <Table dataSource={dataSource} columns={columns} />
  )
}
