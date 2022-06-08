
import React,{useContext} from 'react'
//import { connect } from 'react-redux';
import { Layout, Menu,Dropdown,Avatar } from 'antd';
import {withRouter} from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  
} from '@ant-design/icons';

import {CollContext} from '../../context'

const { Header } = Layout;

 function Heade(props) {

  const {role:{roleName}} = JSON.parse(localStorage.getItem('token'))
  const menu = (
    <Menu>
       <Menu.Item key= '1'>
       {roleName}
        
       </Menu.Item> 
        
        {/**退出后清除token并跳转到登录页 */}
       <Menu.Item  key= '2' onClick={() =>{

         localStorage.removeItem('token')
         props.history.replace('/login')
       }}>
       
         退出
           
       </Menu.Item> 
    </Menu>
  );
  const collapsed = useContext(CollContext)
  
  return (
     
     //头部
     <Header style={{padding:'0',backgroundColor:'#999',op}}>
     
     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
     {React.createElement (collapsed ? MenuFoldOutlined : MenuUnfoldOutlined,{
           style : {paddingLeft:'25px'},
           onClick : (() => props.setCollapsed(!collapsed)),
     })}
     

    <Dropdown overlay={menu}  >
      <div style={{paddingRight:'25px'}}>
        <Avatar icon={<UserOutlined />}/>
      </div>
      
    </Dropdown> 
   </div>

   
   </Header>
   
  )
}
export default withRouter(Heade)//把一般组件包裹成路由组件，使其有路由组件的方法
