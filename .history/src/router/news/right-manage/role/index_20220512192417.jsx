import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Button,Modal}from 'antd'
const {confirm} = Modal
export default function List2() {
  
  const [dataSource,setdataSource] = useState([])
  //动态获取权限列表数据
  useEffect(()=>{

     axios.get('http://localhost:3000/rights?_embed=children').then(res =>{
       
       const list = res.data
       //判断当前项有没有子项，没有就设置无子项，有就展示子项
       list.forEach(item => {
         
         if( item.children.length === 0 )  item.children = ''

       });
       
       setdataSource(list)
     })
  },[])
  return (
    <Table dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
