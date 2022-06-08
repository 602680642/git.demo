import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table,Button,Modal}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined,VerticalAlignTopOutlined} from '@ant-design/icons';
const {confirm} = Modal

export default function NewsDraft(props) {
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
          render:(title,items)=> <Button type ='link' href={`/news-manage/preview/${items.id}`}>{title}</Button>
        },
        {
          title: '作者',
          dataIndex: 'author',
         
        },
        {
          title: '新闻分类',
          dataIndex:'categroy',
          
        },
  
        {
          title: '操作',
          
          render:(items)=>{
  
            return <div>
               <Button danger  onClick={()=> delItem(items)} shape='circle' icon = {<DeleteOutlined/>} />
               
               
                 <Button  shape='circle' icon = {<EditOutlined/>} style = {{margin:'0px 10px'}}
                  onClick={()=>{
                     
                  }}
                 />
                 <Button type = 'primary' shape='circle' icon = {<VerticalAlignTopOutlined />} />
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
         
            //删除后要与后台同步
          setdataSource(dataSource.filter(item => item.id !== items.id))
          axios.delete(`/news/${items.id}`)
        
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
