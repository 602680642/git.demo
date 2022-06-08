import React,{lazy,useState,useEffect} from 'react'

import {CollContext} from '../../context'
import { Layout} from 'antd';
import PubSub  from 'pubsub-js'
const { Content } = Layout;
//懒加载
const Heade = lazy(() => import('../../components/header'))
const Aside = lazy(() => import('../../components/aside')) 

const Corouter = lazy(() => import('../pages')) 
export default function News() {
  
  
  //控制折叠展开左侧菜单栏，默认展开
  const [collapsed,setCollapsed] = useState(false)
  return (
    //容器
    <Layout>
      {/*左侧菜单栏*/}
      <CollContext.Provider value = {collapsed}>
       <Aside />
      </CollContext.Provider>
       
      <Layout>
        {/*头部导航区*/}
        <CollContext.Provider value = {collapsed}>
          
          <Heade  setCollapsed = {setCollapsed}/>
        </CollContext.Provider>
        
        
          {/*内容区*/}
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
           
          <Corouter/>
          </Content>
       
      </Layout>
    </Layout>
    

  )
}
