import React,{lazy,useEffect,useState} from 'react'
import axios from 'axios'
import {Redirect, Route,Switch} from 'react-router-dom'
const Home  = lazy(() => import('../news/home'))
const UserList  = lazy(() => import('../news/user-manage/list'))
const List1  = lazy(() => import('../news/right-manage/right'))
const List2  = lazy(() => import('../news/right-manage/role'))
const Audit  = lazy(() => import('../news/audit-manage/audit'))
const AuditList  = lazy(() => import('../news/audit-manage/list'))
const NewsAdd  = lazy(() => import('../news/news-manage/add'))
const NewsDraft  = lazy(() => import('../news/news-manage/draft'))
const NewsCategory  = lazy(() => import('../news/news-manage/category'))
const Publish  = lazy(() => import('../news/publish-manage/published'))
const UnPublish  = lazy(() => import('../news/publish-manage/unpublished'))
const PublishSunset  = lazy(() => import('../news/publish-manage/sunset'))

const routers = {
  
    '/home':Home,
    '/user-manage/list':UserList,
    '/right-manage/right':List1,
    '/right-manage/role' :List2,
    '/audit-manage/audit':Audit,
    '/audit-manage/list' :AuditList,
    '/news-manage/add' :NewsAdd,
    '/news-manage/draft' :NewsDraft,
    '/news-manage/category'  : NewsCategory,
    '/publish-manage/published'  : Publish,
    '/publish-manage/unpublished'  : UnPublish,
    '/publish-manage/sunset'  : PublishSunset

}
export default function Corouter() {

  const [routeList,setrouteList] = useState([])
  useEffect(()=>{
   
    Promise.all([

        axios.get('http://localhost:3000/rights'),
        axios.get('http://localhost:3000/children'),
    ]).then(() =>{
     
      se
  })
  return (
    <Switch>
            {
              routeList.map(item =>  
              
               <Route path={item.key} key= {item.key} component = {routers[item.key]} exact/> 
              
              ) 
            }
            
            <Redirect from = '/' to= '/home'/>
    </Switch>
  )
}
