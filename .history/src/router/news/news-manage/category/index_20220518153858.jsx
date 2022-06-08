import React from 'react'

export default function NewsCategory() {

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
  return (
    <div>NewsCategory</div>
  )
}
