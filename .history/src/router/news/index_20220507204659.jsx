import React from 'react'

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined,
         NotificationOutlined, MenuUnfoldOutlined, 
         MenuFoldOutlined,

} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

//左侧导航栏数据
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

  //控制折叠展开左侧菜单栏，默认展开
  //const [collapsed,setCollapsed] = React.useState(false),
  //toggle = (() => setCollapsed(!collapsed))
   //懒加载
  const Heade = lazy(() => import('./com/login'))
 // const News = lazy(() => import('./router/news')) 
  return (
    //容器
    <Layout>
      {/*头部*/}
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
      <Layout>
        {/*左侧菜单栏*/}
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
          {/*面包屑*/}
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          {/*内容区*/}
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
