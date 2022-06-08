import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import {Table,Button,Modal,Switch}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import UserForm from '../../../../components/userForm';
const {confirm} = Modal
export default function User() {
  //使用ref获取添加表单
  const form = useRef(null);
  //使用ref获取更新表单
  const upform = useRef(null)
  //定义一个变量存取当前值
  const cudata = null
  //用户列表数据
  const [userData,setUserData] =useState([])
  //添加弹出框
  const [isModalVisible,setIsModalVisible] = useState(false)
  //修改弹出框
  const [isUpdate,setisUpdate] = useState(false)
  const [isdisabled,setisdisabled] = useState(false)
  //角色列表数据
  const [roleList,setroleList] = useState([])
  //区域列表数据
  const [regList,setregList] = useState([])
  //获取用户数据
  useEffect(()=>{

    axios.get('http://localhost:3000/users?_expand=role').then(res =>{
      
     
      setUserData(res.data)
    })
 },[])
 //获取角色数据
 useEffect(()=>{

  axios.get('http://localhost:3000/roles').then(res =>{
    
   
    setroleList(res.data)
  })
},[])
//获取区域数据
useEffect(()=>{

  axios.get('http://localhost:3000/regions').then(res =>{
    
   
    setregList(res.data)
  })
},[])
//用户列表表字段数据
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
        
          <Button type = 'primary' shape='circle' icon = {<EditOutlined/>}  disabled = {items.default}  onClick = {() => edit(items)}/>
          <Modal
            visible={isUpdate}
            title="更新用户"
            okText="确定更新"
            cancelText="取消"
            onCancel={() => {setisUpdate(false)
              setisdisabled(!isdisabled)}}
            onOk={handleedit}
          >
            <UserForm roleList = {roleList} regList = {regList} isdisabled = {isdisabled} ref = {upform}/>
          </Modal>
      </div>
    }
  },
];

//权限开关
const  permisson = (items) =>{

  items.roleState = !items.roleState 
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

 const edit = (items) =>{

    setTimeout(()=>{

      setisUpdate(true)
      if(items.roleId === 1)  setisdisabled(true)
      else setisdisabled(false)
      upform.current.setFieldsValue(items)
    })
 }
 const  handleedit = () =>{
   
    upform.current.validateFields().then(value => {

       setisUpdate(false)

       setUserData(userData.map(item =>{

          if(item.id === cudata.id){

            return {

               ...item,
               ...value,
               role:roleL
            }
          }
       }))
    })

   
 }
const handleok = () => {
  //校验后
  form.current.validateFields().then(values => {
    
    //关闭弹出框
    setIsModalVisible(false);
    //重置输入内容
    form.current.resetFields();
    //post到后端，生成id，再设置数据，方便后期的删除和更新
    axios.post('http://localhost:3000/users',{

      ...values,
      'roleState':true,
      'default':false
    }).then(res =>{

      setUserData([...userData,{

        ...res.data,
        role:roleList.filter(item => item.id === values.roleId)[0]
      }])
    })       
  }).catch(err =>{

     console.log(err.message);
  })
          
}
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
        onOk={handleok}
      >
        <UserForm roleList = {roleList} regList = {regList} ref= {form}/>
      </Modal>
    </div>
   
  )
}
