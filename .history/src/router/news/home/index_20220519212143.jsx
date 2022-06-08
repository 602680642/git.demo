import React,{useState,useEffect} from 'react'
import {Row,Col,Card,Avatar,List} from 'antd'
import axios from 'axios'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
export default function Home() {
  const {username,region,role:{roleName}} = JSON.parse(localStorage.getItem('token'))
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
    
    <Row gutter={16}>
      <Col span={8}>
        <Card title="用户最常浏览" bordered={true} >
        <List
          size='small'
          dataSource={viewdata}
          renderItem={item => <List.Item><a type ='link' href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
    />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="用户点赞最多" bordered={true}>
        <List
          size='small'
          dataSource={stardata}
          renderItem={item => <List.Item><a type ='link' href={`/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
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
          title={username}
          description={region}
        />
      </Card>
      </Col>
    </Row>
  
  )
}
