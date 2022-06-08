import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Button,Modal}from 'antd'
const {confirm} = Modal
export default function List2() {
  
  return (
    <Table dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
