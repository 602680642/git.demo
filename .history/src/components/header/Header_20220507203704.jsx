
import React from 'react'
//头部列表数据
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));



export default function Header() {
  return (
     {/*头部*/}
     <div
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
