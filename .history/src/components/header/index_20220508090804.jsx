
import React from 'react'

import { Layout, Menu } from 'antd';
import {  MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import  {PubSub  from 'pubsub-js'
const { Header } = Layout;
//头部列表数据
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

export default function Heade() {
  
  //控制折叠展开左侧菜单栏，默认展开
  const [collapsed,setCollapsed] = React.useState(false),
  PubSub.subscribe('isCollapsed', toggle = (() => setCollapsed(!collapsed)))

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
