import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag,Button}from 'antd'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
export default function Right() {

   const [dataSource,setdataSource] = useState([])
   
   useEffect(()=>{

      axios.get('http://localhost:3000/rights?_embed=children').then(res =>{
        
        const list = res.data
        //设置首页无
        list[0].children = ''
        setdataSource(list)
      })
   },[])

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
        
        render:()=>{

          return <div>
             <Button danger shape='circle' icon = {<DeleteOutlined/>} style = {{marginRight:'10px'}}></Button>
             <Button type = 'primary' shape='circle' icon = {<EditOutlined/>}></Button>
          </div>
        }
      },
    ];
  return (

    
    <Table dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
