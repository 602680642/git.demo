import React from 'react'
import {Form,Input,Select} from 'antd'
const {Option} = Select
export default function UserForm(props) {
    console.log(props);
   const {username,password,roleId,region} = props
  return (
    <Form
        
        layout="vertical"
       
        
      >
        <Form.Item
          name={username}
          label="用户名"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={password}
          label="密码"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="区域"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select>
              <Option ></Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="title"
          label="角色名称"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select>
              <Option></Option>
          </Select>
        </Form.Item>
        
      </Form>
  )
}
