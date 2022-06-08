import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button} from 'antd'
import { DeleteOutlined} from '@ant-design/icons';

export default function NewsCategory() {

  const [dataSource, setdataSource] = useState([])
  useEffect(() => {

    axios.get('/categories').then(res => {


      setdataSource(res.data)
    })
  }, [])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '栏目名称',
      dataIndex: 'cate',

    },

    {
      title: '操作',

      render: (items) => {

        return <div>
          <Button danger onClick={() => delItem(items)} shape='circle' icon={<DeleteOutlined />} style={{ marginRight: '10px' }} />

        </div>
      }
    },
  ];
  return (
    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
  )
}
