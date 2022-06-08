import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag,Button,Modal, Popover,Switch}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const {confirm} = Modal
export default function User() {

  const [userT]
  return (
    <Table rowKey = {(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
