import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import {Table,Button,Modal,Switch}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import UserForm from '../../../../components/userForm';
const {confirm} = Modal
export default function User() {

  const form = useRef(null);
  const [userData,setUserData] =useState([])
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [roleList,setroleList] = useState([])
  const [regList,setregList] = useState([])
  const [isdis,setIsModalVisible] = useState(false)
  useEffect(()=>{

    axios.get('http://localhost:3000/users?_expand=role').then(res =>{
      
     
      setUserData(res.data)
    })
 },[])

 useEffect(()=>{

  axios.get('http://localhost:3000/roles').then(res =>{
    
   
    setroleList(res.data)
  })
},[])

useEffect(()=>{

  axios.get('http://localhost:3000/regions').then(res =>{
    
   
    setregList(res.data)
  })
},[])
 const columns = [
  {
    title: '区域',
    dataIndex: 'region',
    render:(region) => <b>{region ? region : '全球'}</b>
  },
  {
    title: '角色名称',
    dataIndex: 'role',
    render:(role)=> role.roleName
  },
  {
    title: '用户名',
    dataIndex: 'username',
    
  },
  
  {
    title: '用户状态',
    dataIndex: 'roleState',
    render:(roleState,items) => <Switch checked = {roleState} disabled = {items.default} onChange={()=> permisson(items)}></Switch>
  },
  {
    title: '操作',
    
    render:(items)=>{

      return <div>
         <Button danger  onClick={()=> delItem(items)} shape='circle' icon = {<DeleteOutlined/>} style = {{marginRight:'10px'}} disabled = {items.default}/>
        
          <Button type = 'primary' shape='circle' icon = {<EditOutlined/>}  disabled = {items.default}/>
        
      </div>
    }
  },
];

//权限开关
const  permisson = (items) =>{

  items.roleState = items.roleState === 1 ? 0 : 1
  setUserData([...userData])
  //更新后台数据
  
    
   //补丁修改
    axios.patch(`http://localhost:3000/users/${items.id}`,{

      roleState:items.roleState
    })

  
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
 
 const onCreate = (values) => {
  console.log('Received values of form: ', values);
  setIsModalVisible(false);
};
  return (
    <div>
       <Button type='primary' onClick={() => setIsModalVisible(true)}>添加</Button>
       <Table rowKey = {(items) => items.id} dataSource={userData} columns={columns} pagination = {{pageSize:5}}/>
       <Modal
        visible={isModalVisible}
        title="添加"
        okText="确定"
        cancelText="取消"
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          
          form.current
          .validateFields()
          .then((values) => {
            form.current.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
          
        }}
      >
        <UserForm roleList = {roleList} regList = {regList} ref= {form}/>
      </Modal>
    </div>
   
  )
}
