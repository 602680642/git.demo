import React from 'react'
import {Form,Input,Checkbox,Button} from 'antd'
import Particles from 'react-particles-js';
export default function Login() {

  const onFinish = (values => {
    console.log('Success:', values);
  })

  const onFinishFailed = (errorInfo => {
    console.log('Failed:', errorInfo)
  })

  return (
    <div style={{height:'100%'!,backgroundColor:'rgb(35,39,65)'}}>
      
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      //autoComplete="off"
      style={{backgroundColor:'rgb(89, 170, 188)',
        margin:'160px auto',
        width:'500px',
        padding:'20px 70px 10px 0px',
        
      }}
    >
      <h2 style={{marginLeft:'170px'}}>新闻发布管理系统</h2>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 10, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
