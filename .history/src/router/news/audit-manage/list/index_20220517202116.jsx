import React,{useEffect,useState} from 'react'
import {table} from 'antd'
import axios from 'axios'
export default function AuditList() {

  const {username} = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
     
    axios.get('/n')

  },[])
  return (
    <div>AuditList</div>
  )
}
