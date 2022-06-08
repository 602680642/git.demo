import { useState,useEffect } from "react"
import axios from 'axios'
import {notification,Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal
export default function usePublish(state,auditState,publishState) {

    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setdataSource] = useState([])
    useEffect(()=>{
       
      axios.get(`/news?author=${username}&publishState=${state}&_expand=category`
      ).then(res =>{
  
          
          setdataSource(res.data)
      })
  
    },[username,state])

    //下线
    const handlePublish = (id) =>{

      confirm({
        title: 'Do you Want to unpublish this news?',
        icon: <ExclamationCircleOutlined />,
  
        onOk() {
  
          setdataSource(dataSource.filter(data => data.id !== id))
          //补丁修改
          axios.patch(`/news/${id}`,
          
          {'auditState':0,'publishState':3}).then(res =>{
  
          notification.info({
  
            message:'通知',
            description:'此新闻已下线,请在【发布管理/已下线】中查看',
            placement:'bottomRight'
          })
          })
        },
        onCancel() {
          
        },
      });
      
    }

    //发布
    const handleunPublish = (items) =>{

      confirm({
        title: 'Do you Want to publish this news?',
        icon: <ExclamationCircleOutlined />,
  
        onOk() {
  
          setdataSource(dataSource.filter(data => data.id !== items.id))
          //补丁修改
          axios.patch(`/news/${items.id}`,
          
          {'publishState' : 2,'auditState' : 2}).then(res =>{
  
          notification.info({
  
            message:'通知',
            description:'此新闻已发布,请在【发布管理/已发布】中查看',
            placement:'bottomRight'
          })
          })
        },
        onCancel() {
          
        },
      });
      
    }

    //发送草稿箱
    const handleNews = (items) =>{

      setdataSource(dataSource.filter(data => data.id !== items.id))
      axios.patch(`/news/${items.id}`,{'publishState' : 0,'auditState' : 0}).then(res =>{
  
      notification.info({
  
        message:'通知',
        description:'此新闻已存至草稿箱,请在【新闻管理/草稿箱】中查看',
        placement:'bottomRight'
      })
      })
  }
    return {dataSource,handlePublish,handleunPublish,handleNews}
} 
   