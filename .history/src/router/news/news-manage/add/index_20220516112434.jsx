import React,{useState,useEffect} from 'react'
import {PageHeader,Steps,Button} from 'antd'
const { Step } = Steps;
export default function NewsAdd() {

  const [cuState,setcuState] = useState(0)
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

    <div style={{marginTop:'30px'}}>

      <div>
         111
      </div>
      <div>
          222
      </div>
      <div>
          333
      </div>
    </div>
    <Button onClick={nextStep}>下一步</Button>
    <Button onClick={nextStep}>上一步</Button>
    <Button >提交审核</Button>
  </div>
  )
}
