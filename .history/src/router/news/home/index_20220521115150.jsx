import React,{useState,useEffect,useRef} from 'react'
import {Row,Col,Card,Avatar,List,Drawer} from 'antd'
import axios from 'axios'
import * as echarts from 'echarts'
//引入用于分组的
import _ from 'lodash'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
export default function Home() {
  const {username,region,role:{roleName}} = JSON.parse(localStorage.getItem('token'))
  //查看数据
  const [viewdata,setviewdata] = useState([])
  //点赞数据
  const [stardata,setstardata] = useState([])
  //饼图
  const [piechart,setpiechart] = useState(null)
  //弹出框
  const [visible, setVisible] = useState(false);
  //所有已发布数据
  const [allList, setallList] = useState([]);
  const chart = useRef()
  const pieRef = useRef()
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
  useEffect(()=>{

    axios.get('/news?publishState=2&_expand=category').then(res =>{
     
     const listdata = res.data

     setallList(listdata)
    // console.log(res.data);把查询到的所有已发布数据进行分类标题分组归纳
     renderechart(_.groupBy(listdata,item => item.category.title))
    })
    //取消监视窗口改变
    return () =>{

      window.onresize = null 
         
    }
  },[])
  
  const renderechart = (obj) => {
    const myChart = echarts.init(chart.current);
    // 绘制图表
    myChart.setOption({

      title: {
        text: '新闻分类图表'
      },
      legend:{},
      tooltip: {},
      xAxis: {
        data:Object.keys(obj),
        axisLabel:{
          rotate:'45',
          interval:0
        }
      },
      yAxis: {
        minInterval:1//最小间隔为1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item => item.length)
        }
      ]
    })

    window.onresize = () =>{

      myChart.resize()
   }
  }

  //饼状

  const renderpie = () => {
  
    let mypieChart

    const piedata = allList.filter(item => item.author === username)
    const pieObj = _.groupBy(piedata,item => item.category.title)
    const list = []
    for(let i in pieObj){

      list.push({

        name:i,
        value:pieObj[i].length
      })
    }
    if(!piechart){
     mypieChart = echarts.init(pieRef.current);
     setpiechart(mypieChart)
    }else mypieChart = piechart

    const option = {
      
      

      legend:{

       
        
        
      },
      tooltip: {

        
      },
      series: [
        {
          type: 'pie',
          radius:'50%',
          data: list
        }
      ]


    }

    option && mypieChart.setOption(option)
  }
  return (
    <div>
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
        bordered={false}
        
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            
          />
        }
        actions={[
          <SettingOutlined key="setting" onClick={() =>{
            
            setTimeout(()=>{

                setVisible(true)
                renderpie()
            })
            
          }}/>,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}

        
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={username}
          
          description={

            <div>
              <b>{region?region:'全球'}</b>
              <b style={{paddingLeft:'10px'}}>{roleName}</b>
            </div>
          }
        />
      </Card>
      </Col>
    </Row>
    <div ref={chart} style={{height:'400px',marginTop:'30px'}}>
      
    </div>
    
      <Drawer 
       title='个人新闻分类图表' 
       placement="right"
       onClose={() => setVisible(false)} 
       visible={visible} 
       //closable
       width='400px'
     
      >
      <div ref={pieRef} style={{width:'100%',height:'100%'}}></div>
      </Drawer>
     
    </div>
  )
}
