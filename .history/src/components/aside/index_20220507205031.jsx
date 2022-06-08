import React from 'react'

export default function index() {
  return (
      
    <Sider width={200} style={{ background: '#fff' }} trigger={null} collapsible collapsed={collapsed}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items = {items2}
          >
          </Menu>
        </Sider>
  )
}
