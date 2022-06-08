import { lazy,Suspense } from "react";

import {Route,Switch} from 'react-router-dom'
import Loading from "./components/Loading";

export default function App() {

  const Login = lazy() => import('')
  return (
    <div className="App">
      我是app组件
    </div>
  );
}


