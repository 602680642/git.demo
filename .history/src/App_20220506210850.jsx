import { lazy,Suspense } from "react";

import {Route,Switch} from 'react-router-dom'
import Loading from "./components/Loading";

export default function App() {
  
  //懒加载
  const Login = lazy(() => import('./router/login'))
  const News = lazy(() => import('./router/news'))
  return (
    <Suspense fallback = {<Loading/>}>

      <Switch>
        <Route path = '/login' component = {Login}/>
        <Route path = '/' render = { () => 
          
          <News/> 
        }
        />
      </Switch>
    </Suspense>
  );
}


