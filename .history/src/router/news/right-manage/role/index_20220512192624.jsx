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
