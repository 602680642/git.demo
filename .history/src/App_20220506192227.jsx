import { lazy,Suspense } from "react";

import {Route,Switch} from 'react-router-dom'
import Loading from "./components/Loading";

export default function App() {

  const login = lazy(() => import('./pages/login'))
  const news = lazy(() => import('./pages/login'))
  return (
    <div className="App">
      我是app组件
    </div>
  );
}


