import React,{useState,useEffect} from 'react'
import {Row,Col,Card,Avatar,List,Button} from 'antd'
import axios from 'axios'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
export default function Home() {

  const [viewdata,setviewdata] = useState([])
  const [stardata,setstardata] = useState([])
  useEffect(()=>{

    axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(res =>{

      setviewdata(res.data)
    })
  },[])

  useEffect(()=>{

    axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res =>{

      setstardata(res.data)
    })
  },[])
  return (
    <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="用户最常浏览" bordered={true}>
        <List
        
          dataSource={viewdata}
          renderItem={item => <List.Item><Button type ='link' href={`/news-manage/preview/${item.id}`}>{item.title}</Button></List.Item>}
    />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="用户点赞最多" bordered={true}>
        <List
        
          dataSource={stardata}
          renderItem={item => <List.Item><Button type ='link' href={`/news-manage/preview/${item.id}`}>{item.title}</Button></List.Item>}
    />
        </Card>
      </Col>
      <Col span={8} >
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
