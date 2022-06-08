import React,{useState,useEffect} from 'react'
import {PageHeader,Steps,Button} from 'antd'
import style  from '../newsstyle/new.module.css'
const { Step } = Steps;
export default function NewsAdd() {

  const [cuState,setcuState] = useState(0)

  const nextStep = () =>{

   setcuState(cuState + 1)
  }

  const preStep = () =>{

    setcuState(cuState - 1)
  }

  const Submit = () =>{


  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        
        title="撰写新闻"
        subTitle="This is a subtitle"
      />

     <Steps current={cuState}>
      <Step title="基本信息" description="新闻标题，新闻分类" />
      <Step title="新闻内容" description="新闻主体内容"  />
      <Step title="新闻提交" description="保存草稿或者提交审核" />
    </Steps>

    <div style={{margin:'30px 0px'}}>

      <div className={cuState === 0 ? '' : style.curstep}>
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
     
      <Form.Item
        label="新闻呢标题"
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
      </Form>
      </div >
      <div className={cuState === 1 ? '' : style.curstep}>
          222
      </div>
      <div className={cuState === 2 ? '' : style.curstep}>
          333
      </div>
    </div>

    <div>
       {
         
        cuState < 2 && <Button onClick={nextStep} type = 'primary'>下一步</Button>
       }
       {
         
         cuState > 0 && <Button onClick={preStep}>上一步</Button>
       }
       {
        cuState === 2 && <span>
            <Button>保存草稿箱</Button>
            <Button onClick={Submit}>提交审核</Button>
         </span>
       }
      
    </div>
  </div>
  )
}
