import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Table, Tag,Button,Modal, Popover,Switch}from 'antd'
import {EditOutlined, DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';

export default function User() {
  return (
    <Table rowKey = {(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
