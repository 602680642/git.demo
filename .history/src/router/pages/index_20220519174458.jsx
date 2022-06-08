import React,{lazy,useEffect,useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect, Route,Switch} from 'react-router-dom'
import {IsLoading} from '../../redux/actions/loading'
import '../../util/http'
import {Spin} from 'antd'
const Home  = lazy(() => import('../news/home'))
const UserList  = lazy(() => import('../news/user-manage/list'))
const RightList  = lazy(() => import('../news/right-manage/right'))
const RoleList  = lazy(() => import('../news/right-manage/role'))
const Audit  = lazy(() => import('../news/audit-manage/audit'))
const AuditList  = lazy(() => import('../news/audit-manage/list'))
const NewsAdd  = lazy(() => import('../news/news-manage/add'))
const NewsDraft  = lazy(() => import('../news/news-manage/draft'))
const NewsPreview = lazy(() => import('../news/news-manage/preview'))
const NewsUpdate = lazy(() => import('../news/news-manage/update'))
const NewsCategory  = lazy(() => import('../news/news-manage/category'))
const Publish  = lazy(() => import('../news/publish-manage/published'))
const UnPublish  = lazy(() => import('../news/publish-manage/unpublished'))
const PublishSunset  = lazy(() => import('../news/publish-manage/sunset'))

const routers = {
  
    '/home':Home,
    '/user-manage/list':UserList,
    '/right-manage/right/list':RightList ,
    '/right-manage/role/list' :RoleList ,
    '/audit-manage/audit':Audit,
    '/audit-manage/list' :AuditList,
    '/news-manage/add' :NewsAdd,
    '/news-manage/draft' :NewsDraft,
    '/news-manage/preview/:id':NewsPreview,
    '/news-manage/update/:id':NewsUpdate,
    '/news-manage/category'  : NewsCategory,
    '/publish-manage/published'  : Publish,
    '/publish-manage/unpublished'  : UnPublish,
    '/publish-manage/sunset'  : PublishSunset

}
 function Corouter(props) {
 console.log(props);
  const [routeList,setrouteList] = useState([])
  //两个表合并使其扁平化
  useEffect(()=>{
   
    Promise.all([

        axios.get('/rights'),
        axios.get('/children'),
    ]).then(res =>{
     
      setrouteList([...res[0].data,...res[1].data])
      
    })
  },[])
  const {role:{rights}} = JSON.parse(localStorage.getItem('token'))

  //根据角色显示对应路由权限
  const checkRoute = (item) =>{
    
    return routers[item.key] && (item.pagepermisson ||item.routepermisson)
  }
  //权限开关
  const checkPermission = (item) =>{
 //console.log(item);
    return rights.includes(item.key)
}
  return (
    <Spin  spinning={props.isloading}>
    <Switch>
            {
              routeList.map(item =>  
              
                {
                    if(checkRoute(item) && checkPermission(item)){
                       
                      return <Route path={item.key} key= {item.key} component = {routers[item.key]} exact/> 
                    }

                    return null
                }

                
              ) 

              
            }
            
            <Redirect from = '/' to= '/home' exact/>
    </Switch>
  </Spin>
    
  )
}

export default connect(

  state => ({isloading:state.isloading}),
  {
    

  }
)(Corouter)
