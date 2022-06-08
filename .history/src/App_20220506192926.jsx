import { lazy,Suspense } from "react";

import {Route,Switch} from 'react-router-dom'
import Loading from "./components/Loading";

export default function App() {
  
  //懒加载
  const Login = lazy(() => import('./router/pages/login'))
  const News = lazy(() => import('./router/pages/news'))
  return (
    <Suspense fallback = {<Loading/>}>

      <Switch>
        <Route path = '/login' component = {Login}></Route>
        <Route path = '/news' component = {News}></Route>
      </Switch>
    </Suspense>
  );
}


