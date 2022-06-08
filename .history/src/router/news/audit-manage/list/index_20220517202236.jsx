import React,{useEffect,useState} from 'react'
import {table} from 'antd'
import axios from 'axios'
export default function AuditList() {

  const {username} = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState`)

  },[])
  return (
    <div>AuditList</div>
  )
}
