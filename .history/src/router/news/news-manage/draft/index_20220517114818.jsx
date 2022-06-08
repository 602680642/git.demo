import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table,Button,Modal}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const {confirm} = Modal

export default function NewsDraft() {
  const {username} = JSON.parse(localStorage.getItem('token'))
     //权限列表数据
     const [dataSource,setdataSource] = useState([])
     //动态获取权限列表数据
     useEffect(()=>{
  
        axios.get(`/news?author=${username}&auditState=0&_expand=categroy`).then(res =>{
  
          console.log(res.data);
          setdataSource(res.data)
        })
     },[username])
     //表头数据
     const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          render:(id) => <b>{id}</b>
        },
        {
          title: '新闻标题',
          dataIndex: 'title',
         
        },
        {
          title: '作者',
          dataIndex: 'author',
         
        },
        {
          title: '新闻分类',
          dataIndex:'categroy',
          render:(categroy)=>{

            return categroy.title
          } 
        },
  
        {
          title: '操作',
          
          render:(items)=>{
  
            return <div>
               <Button danger  onClick={()=> delItem(items)} shape='circle' icon = {<DeleteOutlined/>} style = {{marginRight:'10px'}}/>
               
               
                 <Button type = 'primary' shape='circle' icon = {<EditOutlined/>} disabled = {items.pagepermisson === undefined}/>
               
            </div>
          }
        },
      ];
     //删除数据
     const delItem = (items) =>{
      
      confirm({
        title: 'Do you Want to delete this item?',
        icon: <ExclamationCircleOutlined />,
        
        onOk() {
         
          //删除一级
          if(items.grade === 1){
  
            //删除后要与后台同步
          setdataSource(dataSource.filter(item => item.id !== items.id))
          axios.delete(`/rights/${items.id}`)
           
          }else{
             //删除二级
             //根据当前id找到对应的父级
             let list = dataSource.filter(item => item.id === items.rightId)
             //根据父id过滤掉子级不需要的(此时子级数据已经修改)
             list[0].children = list[0].children.filter(item =>item.id !== items.id)
             //修改数据
             setdataSource([...dataSource])
             axios.delete(`/children/${items.id}`)
          }
          
          
        },
        onCancel() {
          console.log('Cancel');
        },
      });
  
     }
    
     
     return (
  
      
      <Table dataSource={dataSource} rowKey={(items) => items.id} columns={columns} pagination = {{pageSize:5}}/>
    )
  
}
