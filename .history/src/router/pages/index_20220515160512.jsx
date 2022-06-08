import React,{lazy} from 'react'

import {Redirect, Route,Switch} from 'react-router-dom'
const Home  = lazy(() => import('../news/'))
const UserList  = lazy(() => import('./user-manage/list'))
const List1  = lazy(() => import('./right-manage/right'))
const List2  = lazy(() => import('./right-manage/role'))
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
