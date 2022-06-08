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
      dataIndex: 'roleName',
     
    },
    
    {
      title: '操作',
      
      render:(items)=>{

        return <div>
           <Button danger  onClick={()=> delItem(items)} shape='circle' icon = {<DeleteOutlined/>} style = {{marginRight:'10px'}}/>
           
            <Button type = 'primary' shape='circle' icon = {<EditOutlined/>} />
           
        </div>
      }
    },
  ];

  const delItem = (items) =>{
    
    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      
      onOk() {
       
          //删除后要与后台同步
        setdataSource(dataSource.filter(item => item.id !== items.id))
        axios.delete(`http://localhost:3000/roles/${items.id}`)
         
      },
      onCancel() {
        console.log('Cancel');
      },
    });

   }
  return (
    <div>
      <Table rowKey = {(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
    
      <Modal title = 'modal' visible = {isModalVisible} onOk = {handleOk} onc>
          <p>...</p>
          <p>...</p>
          <p>...</p>
      </Modal>
    </div>
  )
}
