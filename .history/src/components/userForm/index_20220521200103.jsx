import React, { forwardRef,useState,useEffect} from 'react'
import {Form,Input,Select} from 'antd'

const {Option} = Select
//使用forwardRef包裹可以透穿
const  UserForm = forwardRef((props,ref) =>{
//是否禁用区域
const [isDisabled,setIsDisabled] = useState(false)
//
const {roleId,region} = JSON.parse(localStorage.getItem('token'))
//是否禁用区域，除管理员外禁用
const Redisabled = (item)=>{
  
  //如果更新
  if(props.Isupdate){
    //如果
    if(roleId === 1) return false 
   
    else  return true

   //如果添加
  }else if(roleId === 1) return false
     
    else return item.value!==region
   

}
//是否禁用角色
const Rodisabled = (item) =>{

  //如果更新
  if(props.Isupdate){

    if(roleId === 1) return false 
   
    else  return true

   //如果添加
  }else if(roleId === 1) return false
     
    else return item.id!==3

}
//监测isdisabled的改变
useEffect(()=>{

   setIsDisabled(props.isdisabled)

},[props.isdisabled])


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
              required: !isDisabled,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select disabled = {isDisabled}>
              {
                  
                  props.regList.map(item =>{

                    return  <Option disabled={Redisabled(item)} value = {item.value} key = {item.id}/>
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

             //如果是超级管理员就开启禁用并清空区域内容,否则不禁用
             if(value === 1){

                setIsDisabled(true)
                ref.current.setFieldsValue({region:''})
             } 
             else {
                 
                setIsDisabled(false)
             }
          }}>

          {
                  
                  props.roleList.map(item =>

                     <Option disabled={Rodisabled(item)} key = {item.id} value = {item.id}>{item.roleName}</Option>
                  )
                    
                 
          }
          </Select>
        </Form.Item>
        
      </Form>
  )

})
export default UserForm
