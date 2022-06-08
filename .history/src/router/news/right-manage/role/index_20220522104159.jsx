import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, Modal, Tree } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal
export default function RoleList() {
  //角色列表数据
  const [dataSource, setdataSource] = useState([])
  //权限分配数据
  const [treeData, setTreeData] = useState([])
  //弹出框是否弹出
  const [isModalVisible, setIsModalVisible] = useState(false)
  //权限选中数据
  const [cuKey, setCuKey] = useState([])
  //当前点击id
  const [cuId, setCuid] = useState(0)
  //动态获取角色列表数据
  useEffect(() => {

    axios.get('/roles').then(res => {


      setdataSource(res.data)
    })
  }, [])

  //权限分配数据
  useEffect(() => {

    axios.get('/rights?_embed=children').then(res => {

       
      setTreeData(res.data)
    })
  }, [])
  // 表字段
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '权限名称',
      dataIndex: 'roleName',

    },

    {
      title: '操作',

      render: (items) => {

        return <div>
          <Button danger onClick={() => delItem(items)} shape='circle' icon={<DeleteOutlined />} style={{ marginRight: '10px' }} />

          <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={() => {

            setIsModalVisible(true)

            setCuKey(items.rights)
            setCuid(items.id)
          }}
          />

        </div>
      }
    },
  ];
  //删除角色
  const delItem = (items) => {

    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        //删除后要与后台同步
        setdataSource(dataSource.filter(item => item.id !== items.id))
        axios.delete(`/roles/${items.id}`)

      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  const handleCancel = () => {

    setIsModalVisible(false)
  }

  const handleOk = () => {

    setIsModalVisible(false)
    //重置数据
    setdataSource(dataSource.map(item => {

      //判断数据里的id是否和当前点击的id一样
      if (item.id === cuId) {

        return {

          ...item,
          rights: cuKey
        }
      }
     
      return item
      
    }))

    //确定后与后台同步
    axios.patch(`/rights/${cuId}`,{rights:items})
  }

  //修改权限
  const onCheck = checkKey =>  setCuKey(checkKey)

  return (
    <div>
      <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />

      <Modal title='权限分配' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          onCheck={onCheck}
          checkedKeys={cuKey}
          //checkStrictly
          treeData={treeData}
        />
      </Modal>
    </div>
  )
}
