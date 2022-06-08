import React,{useState,useEffect} from 'react'
import {Row,Col,Card,Avatar,List} from 'antd'
import axios from 'axios'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
export default function Home() {

  const [data,setData] = useState
  useEffect(()=>{

    axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&')
  })
  return (
    <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="用户最常浏览" bordered={true}>
        <List
        
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
    />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="用户点赞最多" bordered={true}>
        <List
        
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
    />
        </Card>
      </Col>
      <Col span={8}>
      <Card
        bordered={true}
        
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
      </Col>
    </Row>
  </div>
  )
}
