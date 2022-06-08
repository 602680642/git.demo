import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button,Modal} from 'antd'
import { DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const { confirm } = Modal
export default function NewsCategory() {

  const [dataSource, setdataSource] = useState([])
  useEffect(() => {

    axios.get('/categories').then(res => {


      setdataSource(res.data)
    })
  }, [])

  const delItem = (items) => {

    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        //删除后要与后台同步
        setdataSource(dataSource.filter(item => item.id !== items.id))
        axios.delete(`/categories/${items.id}`)

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '栏目名称',
      dataIndex: 'categroy',
      render: (categroy) => categroy.title
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
