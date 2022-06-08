import React from 'react'
import { PageHeader, Button, Descriptions } from 'antd';
export default function NewsPreview() {
  return (
    <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="详情"
      subTitle="This is a subtitle"
      
     
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="创建者">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="创建时间">
          <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
    </div>
  )
}
