import { useState,useEffect } from "react"
import axios from 'axios'
import {notification,Modal,Button} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal
export default function usePublish(state,auditState,pub) {

    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setdataSource] = useState([])
    useEffect(()=>{
       
      axios.get(`/news?author=${username}&publishState=${state}&_expand=category`
      ).then(res =>{
  
          
          setdataSource(res.data)
      })
  
    },[username,state])

    const handlePublish = (items) =>{

      confirm({
        title: 'Do you Want to unpublish this news?',
        icon: <ExclamationCircleOutlined />,
  
        onOk() {
  
          setdataSource(dataSource.filter(data => data.id !== items.id))
          //补丁修改
          axios.patch(`/news/${items.id}`,
          
          {'auditState' : 0,'publishState':3}).then(res =>{
  
          notification.info({
  
            message:'通知',
            description:'此操作已成功,您可以在列表中查看',
            placement:'bottomRight'
          })
          })
        },
        onCancel() {
          
        },
      });
      
    }

    return {dataSource,handlePublish}
} 
   