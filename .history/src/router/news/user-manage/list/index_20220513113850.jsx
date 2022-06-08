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

//权限开关
const  permisson = (items) =>{

  items.pagepermisson = items.pagepermisson === 1 ? 0 : 1
  setdataSource([...dataSource])
  //更新后台数据
  if(items.grade === 1){
    
   //补丁修改
    axios.patch(`http://localhost:3000/rights/${items.id}`,{

       pagepermisson:items.pagepermisson
    })

  }else{

   axios.patch(`http://localhost:3000/children/${items.id}`,{

       pagepermisson:items.pagepermisson
   })
  }
}
 const delItem = (items) =>{
    
  confirm({
    title: 'Do you Want to delete this item?',
    icon: <ExclamationCircleOutlined />,
    
    onOk() {
     
        //删除后要与后台同步
        setUserData(userData.filter(item => item.id !== items.id))
      axios.delete(`http://localhost:3000/users/${items.id}`)
       
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
