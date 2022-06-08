import React from 'react'

const Home  = lazy(() => import('./home'))
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
