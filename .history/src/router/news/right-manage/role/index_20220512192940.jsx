import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Button,Modal}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
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
      title: '操作',
      
      render:(items)=>{

        return <div>
           <Button danger  onClick={()=> delItem(items)} shape='circle' icon = {<DeleteOutlined/>} style = {{marginRight:'10px'}}/>
           
            <Button type = 'primary' shape='circle' icon = {<EditOutlined/>} disabled = {items.pagepermisson === undefined}/>
           
        </div>
      }
    },
  ];

  const delItem = (items) =>{
    
    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      
      onOk() {
       
        //删除一级
        if(items.grade === 1){

          //删除后要与后台同步
        setdataSource(dataSource.filter(item => item.id !== items.id))
        axios.delete(`http://localhost:3000/rights/${items.id}`)
         
        }else{
           //删除二级
           //根据当前id找到对应的父级
           let list = dataSource.filter(item => item.id === items.rightId)
           //根据id过滤掉子级不需要的(此时子级数据已经修改)
           list[0].children = list[0].children.filter(item =>item.id !== items.id)
           //修改数据
           setdataSource([...dataSource])
           axios.delete(`http://localhost:3000/children/${items.id}`)
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
