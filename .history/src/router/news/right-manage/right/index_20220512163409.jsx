import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag,Button,Modal}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const {confirm} = Modal
export default function Right() {

   const [dataSource,setdataSource] = useState([])
   
   useEffect(()=>{

      axios.get('http://localhost:3000/rights?_embed=children').then(res =>{
        
        const list = res.data
        //判断当前项有没有子项，没有就设置无子项，有就展示子项
        list.forEach(item => {
          
          if( item.children.length === 0 )  item.children = ''

        });
        
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
        
        render:(items)=>{

          return <div>
             <Button danger  onClick={()=> delItem(items)} shape='circle' icon = {<DeleteOutlined/>} style = {{marginRight:'10px'}}></Button>
             <Button type = 'primary' shape='circle' icon = {<EditOutlined/>}></Button>
          </div>
        }
      },
    ];

   const delItem = (items) =>{
    
    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      
      onOk() {

        if(items.grade === 1){

          //删除后要与后台同步
        setdataSource(dataSource.filter(item => item.id !== items.id))
        axios.delete(`http://localhost:3000/rights/${items.id}`)

        }else{

           let list = dataSource.filter(item => item.id === items.rightId)
           list[0].children = list[0].children.filter(item )
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
