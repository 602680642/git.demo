import React from 'react'
import {Form,Input,Checkbox,Button, message} from 'antd'
import axios from 'axios'
export default function Login(props) {

  const onFinish = (values => {
    console.log('Success:', values);
    axios.get(`http://localhost:3000/users?
    username = ${values.username} &
    password = ${values.Password} &
    roleState = true & _expand = role
    `).then(res =>{

        if(res.data.length === 0){
        
        message.error('用户名或密码不匹配')
      }
        else{

           localStorage.setItem('token',JSON.stringify(res.data[0]))
           props.history.push('/')
        }
    })
  })

  const onFinishFailed = (errorInfo => {
    console.log('Failed:', errorInfo)
  })

  return (
    <div>
    
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
