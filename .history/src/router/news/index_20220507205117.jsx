import React,{lazy} from 'react'

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
  const Heade = lazy(() => import('./components/header'))
  const News = lazy(() => import('./router/news')) 
  return (
    //容器
    <Layout>
      {/*头部*/}
      <Heade/>
     
      <Layout>
        {/*左侧菜单栏*/}
        
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
