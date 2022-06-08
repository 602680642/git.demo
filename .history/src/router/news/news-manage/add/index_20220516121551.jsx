import React,{useState,useEffect} from 'react'
import {PageHeader,Steps,Button} from 'antd'
import  curstep  from '../newsstyle/new.less'
const { Step } = Steps;
export default function NewsAdd() {

  const [cuState,setcuState] = useState(0)

  const nextStep = () =>{

    if(cuState < 2) setcuState(cuState + 1)
  }

  const preStep = () =>{

    if(cuState > 0) setcuState(cuState - 1)
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

      <div className={cuState === 0 ? '' : curstep}>
         111
      </div >
      <div className={cuState === 1 ? '' : curstep}>
          222
      </div>
      <div className={cuState === 2 ? '' : curstep}>
          333
      </div>
    </div>

    <div>
       {
         
        cuState > 0 && <Button onClick={nextStep}>下一步</Button>
       }
       {
         
         cuState < 2 && <Button onClick={preStep}>上一步</Button>
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
