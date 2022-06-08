import { lazy,Suspense } from "react";

import {Route,Switch} from 'react-router-dom'
import Loading from "./components/Loading";

export default function App() {

  const Login = lazy(() => import('./pages/login'))
  const News = lazy(() => import('./pages/news'))
  return (
    <Suspense fallback = {<Loading/>}>

      <Switch>
        <Route path = '/login' component = {Login}></Route>
        <Route path = '/news' component = {Login}></Route>
      </Switch>
    </Suspense>
  );
}


