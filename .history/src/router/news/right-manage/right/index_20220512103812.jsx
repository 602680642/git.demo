import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table}from 'antd'
export default function Right() {

   const [dataSource,setdataSource] = useState([])
   
   useEffect(()=>{

      axios.get('http://localhost:3000/rights').then(res =>{

        setdataSource(res.data)
      })
   },[])

   const columns = [
      {
        title: 'id',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'title',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];
  return (

    
    <Table dataSource={dataSource} columns={columns} />
  )
}
