import React,{lazy} from 'react'

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
const Publish  = lazy(() => import('../news/publish-manage/unpublished'))
const NewsCategory  = lazy(() => import('../news/publish-manage/sunset'))
export default function Corouter() {
  return (
    <Switch>

            <Route path= '/home' component = {Home}/>
            <Route path= '/user-manage/list' component = {UserList}/>
            <Route path= '/right-manage/right' component = {List1}/>
            <Route path= '/right-manage/role' component = {List2}/>
            
    </Switch>
  )
}
