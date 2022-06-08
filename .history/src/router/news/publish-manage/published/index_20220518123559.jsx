import React,{useEffect,useState} from 'react'
import axios from 'axios'
export default function Publish() {
  const [userData,setUserData] =useState([])
  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  
  useEffect(()=>{

    axios.get('/users?_expand=').then(res =>{
      
       const list = res.data
      // console.log(res.data);
      //如果是超级管理员就渲染全部数据，如果不是就渲染权限内部分数据
      setUserData(roleId === 1 ? list : [...list.filter(item => item.username === username),
        ...list.filter(item => item.region === region && item.roleId===3)
      ])
    })
 },[roleId,region,username])
  return (
    <div>NewsDraft</div>
  )
}
