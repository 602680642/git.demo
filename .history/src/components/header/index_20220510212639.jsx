
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
       
         超级管理员
           
       </Menu.Item> 
    </Menu>
  );
  
  export default function Heade(props) {
  
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
       padding:'0 5px'
     }}
     
     >新闻发布系统</div>
     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
     <Icon type = {collapsed ? 'menu-unfold' : 'menu-fold'}
           style={{color:'white'}}
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