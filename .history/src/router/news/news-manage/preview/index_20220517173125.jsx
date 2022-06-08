import React,{useEffect,useState} from 'react'
import { PageHeader,  Descriptions } from 'antd';
import axios from 'axios'
export default function NewsPreview(props) {

  const [data,setData] = useState(null)
  useEffect(()=>{

    axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res =>{
      
        setdata

    })
  })
  return (
    <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="详情"
      subTitle="This is a subtitle"
      
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="创建者"></Descriptions.Item>
        <Descriptions.Item label="创建时间">
          
        </Descriptions.Item>
        <Descriptions.Item label="发布时间"></Descriptions.Item>
        <Descriptions.Item label="区域"></Descriptions.Item>
        <Descriptions.Item label="审核状态">
          
        </Descriptions.Item>
        <Descriptions.Item label="发布状态">
          
        </Descriptions.Item>
        <Descriptions.Item label="访问数量"></Descriptions.Item>
        <Descriptions.Item label="点赞数量"></Descriptions.Item>
        <Descriptions.Item label="评论数量"></Descriptions.Item>
      </Descriptions>
    </PageHeader>
    </div>
  )
}
