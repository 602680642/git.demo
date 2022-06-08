
import React,{useContext} from 'react'
//import { connect } from 'react-redux';
import { Layout, Menu,Dropdown } from 'antd';
import {  MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
//import  PubSub    from 'pubsub-js'
//import {Iscollapsed}   from '../../redux/actions/collAction.js'
import {CollContext} from '../../context'
const { Header } = Layout;
//头部列表数据
/*const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }))*/

 const menu = (
    <Menu
      items={[
        {
          label: (
            <span>
              超级管理员
            </span>
            
          ),

        },
       
      ]}
    />
  );
  
  export default function Heade() {

  const {collapsed,setCollapsed} = useContext(CollContext),
   
  //const [collapsed,setCollapsed] = React.useState(false),
  toggle = (() => setCollapsed(!collapsed))
  //PubSub.publish('iscoll',collapsed)
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
     <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
     {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
           style:{color:'white'},
           onClick: toggle,
     })}
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
     <UserOutlined style={{backgroundColor:'white',borderRadius:'15px',padding:'5px'}}/>
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