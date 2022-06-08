import React,{lazy} from 'react'
import {Redirect, Route,Switch} from 'react-router-dom'
import {CollContext} from '../../context'
import { Layout,Breadcrumb} from 'antd';
const { Content } = Layout;
//懒加载
const Heade = lazy(() => import('../../components/header'))
const Aside = lazy(() => import('../../components/aside')) 
const Home  = lazy(() => import('./home'))
const UserList  = lazy(() => import('./user-manage/list'))
const List1  = lazy(() => import('./right-manage'/list))
const List2  = lazy(() => import('./manage/news-manage'))

export default function News() {

  //控制折叠展开左侧菜单栏，默认展开
  const [collapsed,setCollapsed] = React.useState(false)
  
  return (
    //容器
    <Layout>
      {/*头部*/}
      <CollContext.Provider value = {collapsed}>
      <Heade  setCollapsed = {setCollapsed}/>
      </CollContext.Provider>
       
      <Layout>
        {/*左侧菜单栏*/}
        <CollContext.Provider value = {collapsed}>
          <Aside />
        </CollContext.Provider>
        
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
           
          <Switch>

            <Route path= '/home' component = {Home}/>
            <Route path= '/user/list' component = {UserList}/>
            <Route path= '/manage/list1' component = {List1}/>
            <Route path= '/manage/list2' component = {List2}/>
            
          </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    

  )
}
