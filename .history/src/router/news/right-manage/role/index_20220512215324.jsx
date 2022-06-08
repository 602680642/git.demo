import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Button,Modal,Tree}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const {confirm} = Modal
export default function List2() {
  //列表数据
  const [dataSource,setdataSource] = useState([])
  //树形结构数据
  const [treeData,setTreeData] =useState([])
  //弹出框是否弹出
  const [isModalVisible,setIsModalVisible] = useState(false)
  //权限选中
  const [cuKey,setCuKey] = useState([])
  //当前点击id
  const [cuId,setCuid] = useState(0)
  //动态获取权限列表数据
  useEffect(()=>{

     axios.get('http://localhost:3000/roles').then(res =>{
       
    
       setdataSource(res.data)
     })
  },[])

  //权限名称数据
  useEffect(()=>{

    axios.get('http://localhost:3000/rights?_embed=children').then(res =>{
      
     
      setTreeData(res.data)
    })
 },[])
  // 表字段
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
           
            <Button type = 'primary' shape='circle' icon = {<EditOutlined/>}  onClick = {()=> {
              
              setIsModalVisible(true) 
              
              setCuKey(items.rights)
              setCuid(items.id)
              }}
             />
           
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

  const  handleCancel = () =>{

    setIsModalVisible(false)
  }

  const handleOk = () =>{
    
    setIsModalVisible(false)
    //重置数据
    setdataSource(dataSource.map(item =>{

     //判断数据里的id是否和当前点击的id一样
      if(item.id === cuId){

        return {

          ...item,
          rights:cuKey
        }
      }

      return item
    }))

    //确定后与后台同步
  }
  
  //修改权限
  const onCheck = (checkKey) =>{
    
     setCuKey(checkKey)
  }
  return (
    <div>
      <Table rowKey = {(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
    
      <Modal title = '权限分配' visible = {isModalVisible} onOk = {handleOk} onCancel = {handleCancel}>
        <Tree
        checkable
        onCheck={onCheck}
        checkedKeys= {cuKey}
        //checkStrictly
        treeData={treeData}
        />
      </Modal>
    </div>
  )
}
