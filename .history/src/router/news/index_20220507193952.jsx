import React from 'react'

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined,
  MenuFoldOutlined,} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

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
export default function News() {

  const [collapsed,setCollapsed] = React.useState(false),
  toggle = (() => setCollapsed(!collapsed))
    
  return (

    <Layout>
      <Header className="header">
        <div className="logo" 
        style={{

          width: '120px',
          height: '31px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '16px 28px 16px 0px',
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
          style={{ lineHeight: '64px' ,backgroundColor:'red',width:'230px'}}
          items = {items1}
        >
          
        </Menu>
      </div>
      </Header>
      <Layout>
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
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
    

  )
}
