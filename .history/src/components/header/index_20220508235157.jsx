
import React from 'react'
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import {  MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import {Iscollapsed}   from '../../redux/actions/collAction'

const { Header } = Layout;
//头部列表数据
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }))

 function toggle(val) {
    
    Iscollapsed(val)
    console.log(val);
  }

 function Heade(collapsed,b) {

  console.log(collapsed,b);
  return (
     
     //头部
     <Header className="header">
     <div className="logo" 
     style={{

       width: '120px',
       height: '31px',
       background: 'rgba(255, 255, 255, 0.2)',
       margin: '16px 55px 16px 0px',
       float: 'left',
       
     }}
   
     />
     <div style={{display:'flex',alignItems:'center'}}>
     {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
           style:{color:'white'},
           onClick: toggle,
     })}
     <Menu
       theme="dark"
       mode="horizontal"
       defaultSelectedKeys={['2']}
       style={{ lineHeight: '64px'}}
       items = {items1}
     >
       
     </Menu>
   </div>
   </Header>
   
  )
}

export default connect(
   
   state => ({collapsed:state.collapsed}),
   
   {
     
    Iscollapsed
   }
 
)(Heade)