import { useState,useEffect } from "react"
import axios from 'axios'
export default function usePublish(state) {

    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setdataSource] = useState([])
    useEffect(()=>{
       
      axios.get(`/news?author=${username}&publishState=${state}&_expand=category`
      ).then(res =>{
  
          
          setdataSource(res.data)
      })
  
    },[username,state])

    return {dataSource,setdataSource}
} 
   