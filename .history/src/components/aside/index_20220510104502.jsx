import React, {useContext} from 'react'
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined,NotificationOutlined} from '@ant-design/icons';
import {CollContext} from '../../context'

const { Sider } = Layout;
//左侧导航栏数据

const menuList = [

     {

       key:'/home',
       label:''
     }
]
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
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
  
export default function Aside() {
 
  const collapsed = useContext(CollContext)
  return (

    <Sider width={200} style={{ background: '#fff' }} trigger={null} collapsible collapsed={collapsed}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items = {items2}
          >
          </Menu>
        </Sider>
  )
}
