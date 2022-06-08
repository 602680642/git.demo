import React,{useEffect,useState} from 'react'
import {Table,Button,Tag,notification,Modal} from 'antd'
import axios from 'axios'
const { confirm } = Modal
export default function AuditList(props) {

  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&auditState_ne=0&_expand=categroy`
    ).then(res =>{

        console.log(res.data)
        setdataSource(res.data)
    })

  },[username])

  const handleback = (items) =>{
  
     setdataSource(dataSource.filter(data => data.id !== items.id))

     //补丁修改
     axios.patch(`/news/${items.id}`,
     
     {auditState : 0}).then(res =>{

      notification.info({

        message:'通知',
        description:'您可以到草稿箱中查看您的新闻',
        placement:'bottomRight'
      })
     })
  }
  //发布
  const handlePublish = (items) =>{

    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        props.history.push(`/publish-manage/published/${items.id}`)
        //补丁修改
        axios.patch(`/news/${items.id}`,
        
        {publishState : 2}).then(res =>{

        notification.info({

          message:'通知',
          description:'您可以到草稿箱中查看您的新闻',
          placement:'bottomRight'
        })
        })
      },
      onCancel() {
        
      },
    });
    
  }
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

            items.auditState === 2 && <Button type='primary'  onClick={()=> {handlePublish(items)}}>发布</Button>
          }
           {
            items.auditState === 1 && <Button danger  onClick={()=> {handleback(items)}}>撤销</Button>
           
           }
           {
             
             items.auditState === 3 && <Button type='red'  onClick={()=> props.history.push(`/news-manage/update/${items.id}`)}>修改</Button>
           
           }
        </div>
      }
    },
  ];
  return (

    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination = {{pageSize:5}}/>

  )  
}
