import React, {useContext,useEffect,useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {HomeOutlined, UserOutlined,IdcardOutlined ,AuditOutlined,ReconciliationOutlined,SolutionOutlined} from '@ant-design/icons';
import {CollContext} from '../../context'

import { Layout, Menu ,} from 'antd';
const {SubMenu} = Menu
const { Sider } = Layout;

//图标列表
 const iconList = {

  "/home":<HomeOutlined/>,
  "/user-manage":<UserOutlined/>,
  "/right-manage":<IdcardOutlined />,
  "/news-manage":<ReconciliationOutlined />,
  "/audit-manage":<AuditOutlined />,
  "/publish-manage":<SolutionOutlined />
}
 function Aside(props) {
 
  const collapsed = useContext(CollContext)
  //所有菜单数据
  const [menu,setMenu] = useState([])
  //发送请求带回数据
  useEffect(()=>{
       //联表查询，把所有子项也带回来了
      axios.get('/rights?_embed=children').then(res =>{

         setMenu(res.data)
      })
     
  },[])
  //根据当前登录的角色显示对应的权限
  const {role:{rights}} = JSON.parse(localStorage.getItem('token'))
  //侧边栏允许展示并且包含对应的权限路径
  const pagepermisson = (item) =>  item.pagepermisson && rights.includes(item.key)
  
  //根据角色渲染对应的菜单
  const renderMenu = (menu) =>{

      return  menu.map(item =>{

        //如果有子项并且有权限就渲染带子项的权限菜单
        if(item.children?.length>0 && pagepermisson(item)){

          return <SubMenu key={item.key} title={item.title} icon = {iconList[item.key]} >

                     {renderMenu(item.children)} 
                 </SubMenu>
         
        }
        //否则渲染一级的权限菜单
        return pagepermisson(item) && <Menu.Item key={item.key} onClick = {() => props.history.push(item.key)} 
        icon={iconList[item.key]}>{item.title}</Menu.Item>
      })
  }
  //选中的菜单项
  const selectKey = [props.location.pathname]
  //子项选中父级打开
  const openKey = ["/" + props.location.pathname.split("/")[1]]
  return (

    <Sider width={200} style={{ background: '#fff' }} trigger={null} collapsible collapsed={collapsed}>
           
           
           <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={selectKey}
            defaultOpenKeys = {openKey}
            
           >
            
           {renderMenu(menu)}
          </Menu>
           
        </Sider>
  )
}
export default withRouter(Aside)