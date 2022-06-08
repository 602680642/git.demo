import { lazy,Suspense } from "react";

import {Route,Switch} from 'react-router-dom'
import Loading from "./components/Loading";

export default function App() {
  
  //懒加载
  const Login = lazy(() => import('./ropages/login'))
  const News = lazy(() => import('./pages/news'))
  return (
    <Suspense fallback = {<Loading/>}>

      <Switch>
        <Route path = '/login' component = {Login}></Route>
        <Route path = '/news' component = {News}></Route>
      </Switch>
    </Suspense>
  );
}


