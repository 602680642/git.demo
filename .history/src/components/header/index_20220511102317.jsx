
import React,{useContext} from 'react'
//import { connect } from 'react-redux';
import { Layout, Menu,Dropdown ,Icon} from 'antd';


import {CollContext} from '../../context'

const { Header } = Layout;
//头部列表数据
/*const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }))*/

 const menu = (
    <Menu>
       <Menu.Item>
       
         超级管理员
           
       </Menu.Item> 
        
       <Menu.Item>
       
         退出
           
       </Menu.Item> 
    </Menu>
  );
  
  export default function Heade(props) {
  
  const collapsed = useContext(CollContext)
   
  return (
     
     //头部
     <Header className="header">

     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
     <Icon type = {collapsed ? 'menu-unfold' : 'menu-fold'}
           style={{color:'white',back}}
           onClick = {(() => props.setCollapsed(!collapsed))}
     />
     {/*<Menu
       theme="dark"
       mode="horizontal"
       defaultSelectedKeys={['2']}
       style={{ lineHeight: '64px'}}
       items = {items1}
     >
       
    </Menu>*/}

    <Dropdown overlay={menu}  >
     <div>
        <Icon type='user' style={{backgroundColor:'white',borderRadius:'15px',padding:'5px'}}/>
     </div>
    </Dropdown> 
   </div>

   
   </Header>
   
  )
}

/*export default connect(
   
   state => ({collapsed:state.collapsed}),
   
   {
     
    Iscollapsed
   }
 
)(Heade)*/