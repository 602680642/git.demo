import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function Right() {

  const [dataSource,] = useState()
  return (

    
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    
    <Table dataSource={dataSource} columns={columns} />;
  )
}
