import React, {useContext,useEffect,useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { UserOutlined} from '@ant-design/icons';
import {CollContext} from '../../context'

import { Layout, Menu } from 'antd';
const {SubMenu} = Menu
const { Sider } = Layout;
//左侧导航栏数据

/*const menuList = [

     {

       key:'/home',
      // path:'/home',
       title:'首页',
       icon:<UserOutlined/>
     },
     {

      key:'/user',
      title:'用户管理',
      icon:<UserOutlined/>,
      children:[

        {
          key:'/user/list',
          title:'用户列表',
          icon:<UserOutlined/>
        }
      ]
    },

    {

      key:'/manage',
      title:'权限管理',
      icon:<UserOutlined/>,
      children:[

        {
          key:'/manage/list1',
          title:'角色列表',
          icon:<UserOutlined/>
        },
        {
          key:'/manage/list2',
          title:'权限列表',
          icon:<UserOutlined/>
        }
      ]
    },

 
]*/
 const iconList = {

  "/home":<UserOutlined/>,
  "/user-manage":<UserOutlined/>,
  "/user-manage/list":<UserOutlined/>,
  "/right-manage":<UserOutlined/>,
  "/right-manage/role/list":<UserOutlined/>,
  "/right-manage/right/list":<UserOutlined/>,
  
}
 function Aside(props) {
 
  const collapsed = useContext(CollContext)
  const [menu,setMenu] = useState([])

  useEffect(()=>{

      axios.get(' http://localhost:3000/rights?_embed=children').then(res =>{

         setMenu(res.data)
      })
     
  },[])
  const pagepermisson = (item) =>  item.pagepermisson

  const renderMenu = (menu) =>{

      return  menu.map(item =>{

        if(item.children?.length>0 && pagepermisson(item)){

          return <SubMenu key={item.key} title={item.title} icon = {iconList[item.key]}>

                  {renderMenu(item.children)} 
              </SubMenu>
        }

        return pagepermisson(item) && <Menu.Item key={item.key} onClick = {() => props.history.push(item.key)} icon={iconList[item.key]} >{item.title}</Menu.Item>
      })
  }
  const selectKey = [props.location.pathname]
  const openKey = ["/" + props.location.pathname.split("/")[1]]
  return (

    <Sider width={200} style={{ background: '#fff' }} trigger={null} collapsible collapsed={collapsed}>
           
           <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            defaultSelectedKeys={selectKey}
            defaultOpenKeys = {open}
           >
           {renderMenu(menu)}
          </Menu>
        </Sider>
  )
}
export default withRouter(Aside)