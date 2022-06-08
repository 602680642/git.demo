import React, { forwardRef,useState} from 'react'
import {Form,Input,Select} from 'antd'

const {Option} = Select

const  UserForm = forwardRef((props,ref) =>{

const [isdisabled,setIsdisabled] = useState (false)
  return (
     <Form
        ref={ref}
        layout="vertical"
       
        
      >
        <Form.Item
          name="username"
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
          name="password"
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
          name="region"
          label="区域"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select disabled = {isdisabled}>
              {
                  
                  props.regList.map(item =>{

                    return  <Option key = {item.id}>{item.value}</Option>
                  })
                    
                 
              }
              
          </Select>
        </Form.Item>
        
        <Form.Item
          name="roleId"
          label="角色名称"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select onChange={(value)=>{
             console.log(value);
             if(value === 1) {

                setIsdisabled(true)
             } 
             else {
                 setIsdisabled(false)}
          }}>
          {
                  
                  props.roleList.map(item =>

                     <Option key = {item.id}>{item.roleName}</Option>
                  )
                    
                 
              }
          </Select>
        </Form.Item>
        
      </Form>
  )

})
export default UserForm
