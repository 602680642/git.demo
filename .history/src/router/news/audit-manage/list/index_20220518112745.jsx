import React,{useEffect,useState} from 'react'
import {Table,Button,Tag} from 'antd'
import axios from 'axios'
export default function AuditList(props) {

  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=categroy`
    ).then(res =>{

        console.log(res.data)
        setdataSource(res.data)
    })

  },[username])

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,items)=> <Button type ='link' href={`/news-manage/preview/${items.id}`}>{title}</Button>
    },
    {
      title: '作者',
      dataIndex: 'author',
     
    },
    {
      title: '新闻分类',
      dataIndex: 'categroy',
      
    },

    {
      title: '审核状态',
      dataIndex: 'auditState',
      
      render:(auditState)=> {
      const colorList = ['','blue','green','red']
      const dataList = ['草稿箱','审核中','已通过','未通过']
      return  <Tag  color={colorList[auditState]}>{dataList[auditState]}</Tag>
    
    }
    },
    {
      title: '操作',
      
      render:(items)=>{
        
        return <div>
          {

            items.auditState === 2 && <Button type='primary'  onClick={()=> {}}>发布</Button>
          }
           {
            items.auditState === 1 && <Button danger  onClick={()=> {}}>撤销</Button>
           
           }
           {
             
             items.auditState === 3 && <Button type='red'  onClick={()=> props.history.push(`/news-manage/update/${}`)}>修改</Button>
           
           }
        </div>
      }
    },
  ];
  return (

    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>

  )  
}
