
import React,{useContext} from 'react'
//import { connect } from 'react-redux';
import { Layout, Menu,Dropdown } from 'antd';
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
     <Header className="header">
     <div className="logo" 
     style={{

       width: '130px',
       height: '31px',
       background: 'rgba(255, 255, 255, 0.2)',
       margin: '16px 45px 16px 0px',
       float: 'left',
       fontSize:'20px',
       lineHeight:'31px',
       padding:'0 5px',
       
     }}
     
     ><h3>新闻发布系统</h2></div>
     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
     {React.createElement (collapsed ? MenuFoldOutlined : MenuUnfoldOutlined,{
           style : {color :'white'},
           onClick : (() => props.setCollapsed(!collapsed)),
     })}
     

    <Dropdown overlay={menu}  >
     <div>
        <UserOutlined style={{backgroundColor:'white',borderRadius:'15px',padding:'5px'}}/>
     </div>
    </Dropdown> 
   </div>

   
   </Header>
   
  )
}
export default withRouter(Heade)//把一般组件包裹成路由组件，使其有路由组件的方法
/*export default connect(
   
   state => ({collapsed:state.collapsed}),
   
   {
     
    Iscollapsed
   }
 
)(Heade)*/