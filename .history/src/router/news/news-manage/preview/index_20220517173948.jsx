import React,{useEffect,useState} from 'react'
import { PageHeader,  Descriptions } from 'antd';
import axios from 'axios'
export default function NewsPreview(props) {

  const auditList = ['未审核','审核中','已通过','未通过']
  const publishList = ['未发布','待发布','已上线','已下线']
  const [newinfo,setData] = useState(null)
  useEffect(()=>{

    axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(res =>{
      
        setData(res.data)

    })
  },[props.match.params.id])

  return (
    <div className="site-page-header-ghost-wrapper">
    
    {
        
    data && <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
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
    }
    </div>
  )
}
