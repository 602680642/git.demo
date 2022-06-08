import React from 'react'
import {PageHeader,Steps} from 'antd'
const { Step } = Steps;
export default function NewsAdd() {
  return (
    <div>
      <PageHeader
        className="site-page-header"
        
        title="撰写新闻"
        subTitle="This is a subtitle"
      />

     <Steps current={0}>
      <Step title="基本信息" description="新闻标题，新闻分类" />
      <Step title="新闻内容" subTitle="新闻主题内容"  />
      <Step title="Waiting" description="This is a description." />
    </Steps>
  </div>
  )
}
