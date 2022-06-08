import React,{useEffect,useState} from 'react'
import {table} from 'antd'
import axios from 'axios'
export default function AuditList() {

  const {username} = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=categ`)

  },[])
  return (
    <div>AuditList</div>
  )
}
