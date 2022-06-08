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
  const [cudata,setcudata] = useState(null)
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
  //根据登录用户获取权限内对应的角色id,区域
  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  //获取用户权限列表数据
  useEffect(()=>{

    axios.get('/users?_expand=role').then(res =>{
      
       const list = res.data
      
      //如果是超级管理员就渲染全部数据，如果是区域管理员就渲染权限内部分数据并把自己区域和区域编辑过滤出来【区域编辑没有此项权限】
      setUserData(roleId === 1 ? list : [...list.filter(item => item.username === username),
        ...list.filter(item => item.region === region && item.roleId===3)
      ])
    })
 },[roleId,region,username])
 //获取角色数据
 useEffect(()=>{

  axios.get('/roles').then(res =>{
    
   
    setroleList(res.data)
  })
},[])
//获取区域数据
useEffect(()=>{

  axios.get('/regions').then(res =>{
    
   
    setregList(res.data)
  })
},[])
//用户列表表字段数据
 const columns = [
  {
    title: '区域',
    dataIndex: 'region',
    //检索
    filters:[

        ...regList.map(item =>({

           text:item.title,
           value:item.value
        })),
         //添加全球
        {
          text:'全球',
          value:''
        }
    ],
    //检索
    onFilter:(value,item) => item.region === value ,

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
            <UserForm roleList = {roleList} Isupdate = {true} regList = {regList} isdisabled = {isdisabled} ref = {upform}/>
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
    axios.patch(`/users/${items.id}`,{

      roleState:items.roleState
    })

  
  }
//删除数据
 const delItem = (items) =>{
    
  confirm({
    title: 'Do you Want to delete this item?',
    icon: <ExclamationCircleOutlined />,
    
    onOk() {
     
        //删除后要与后台同步
      setUserData(userData.filter(item => item.id !== items.id))
      axios.delete(`/users/${items.id}`)
       
    },
    onCancel() {
      console.log('Cancel');
    },
  });

 }
//编辑按钮
 const edit = (items) =>{
   
  //使用延时器让弹出框跟数据同步
    setTimeout(()=>{

      setisUpdate(true)
      if(items.roleId === 1)  setisdisabled(true)
      else setisdisabled(false)
      //显示之前的数据
      upform.current.setFieldsValue(items)
    })
     //存取修改的数据
    setcudata(items)
 }
 //确认修改
 const  handleedit = () =>{
   
    upform.current.validateFields().then(value => {
       
      
       setisUpdate(false)
       //重置数据
       setUserData(userData.map(item =>{
          如果之前数据的id和我修改的id一致就返回
          if(item.id === cudata.id){

            return {

               ...item,
               ...value,
               role:roleList.filter(data => data.id === value.roleId)[0]
            }
          }
         
          return item
       }))
       setisdisabled(!isdisabled)
       //同步后台数据
    })
     
    
   
 }
 //确认添加
const handleok = () => {
  //校验后
  form.current.validateFields().then(values => {
    
    //关闭弹出框
    setIsModalVisible(false);
    //重置输入内容
    form.current.resetFields();
    //post到后端，生成id，再设置数据，方便后期的删除和更新
    axios.post('/users',{

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
        onCancel={() => {setIsModalVisible(false)

          //使其重新渲染一次清空之前输入内容
          form.current.resetFields()
        }
        }
        onOk={handleok}
      >
        <UserForm roleList = {roleList} regList = {regList} ref= {form}/>
      </Modal>
    </div>
   
  )
}
