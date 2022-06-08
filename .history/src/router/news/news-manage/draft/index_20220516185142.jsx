import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag,Button,Modal}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const {confirm} = Modal
const {username} = JSON.parse(localStorage.getItem('token'))
export default function NewsDraft() {
  
     //权限列表数据
     const [dataSource,setdataSource] = useState([])
     //动态获取权限列表数据
     useEffect(()=>{
  
        axios.get(`/news?author=${username}&auditState = &_embed=categories`).then(res =>{
          
          const list = res.data
          //判断当前项有没有子项，没有就设置无子项，有就展示子项
          list.forEach(item => {
            
            if( item.children.length === 0 )  item.children = ''
  
          });
          
          setdataSource(list)
        })
     },[])
     //表头数据
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
  
      
      <Table dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
    )
  
}
