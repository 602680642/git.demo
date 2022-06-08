import React, {useContext} from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined,} from '@ant-design/icons';
import {CollContext} from '../../context'

import {withRouter} from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu';
const { Sider } = Layout;
//左侧导航栏数据

const menuList = [

     {

       key:'/home',
       label:'首页',
       icon:<UserOutlined/>
     },
     {

      key:'/user',
      label:'用户管理',
      icon:<UserOutlined/>,
      children:[

        {
          key:'/user/list',
          label:'用户列表',
          icon:<UserOutlined/>,
        }
      ]
    },

    {

      key:'/manage',
      label:'权限管理',
      icon:<UserOutlined/>,
      children:[

        {
          key:'/manage/list1',
          label:'角色列表',
          icon:<UserOutlined/>,
        },
        {
          key:'/manage/list2',
          label:'权限列表',
          icon:<UserOutlined/>,
        }
      ]
    },


]
/*const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
  */
 function Aside(props) {
 
  const collapsed = useContext(CollContext)

 /* const renderMenu = (menuList) =>{

      return  menuList.map(item =>{

        if(item.children){

          return <SubMenu key={item.key} label={item.label} >

            {renderMenu(item.children)}
          </SubMenu>
        }

        return <Menu.Item key={item.key} icon = {item.icon}>{item.label}</Menu.Item>
      })
  }*/
  
  return (

    <Sider width={200} style={{ background: '#fff' }} trigger={null} collapsible collapsed={collapsed}>
           <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items = {menuList}
           
          >
         
          </Menu>

          
       

         
          {/*{renderMenu(menuList)} */}
         
        
         
        </Sider>
  )
}
export default withRouter(Aside)