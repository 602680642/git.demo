import React from 'react'

export default function User() {
  return (
    <Table rowKey = {(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
