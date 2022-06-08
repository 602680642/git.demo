import { useState,useEffect } from "react"
import axios from 'axios'
export default function usePublish(state) {

    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setdataSource] = useState([])
    useEffect(()=>{
       
      axios.get(`/news?author=${username}&publishState=${state}&_expand=categroy`
      ).then(res =>{
  
          console.log(res.data)
          setdataSource(res.data)
      })
  
    },[username,sta])

    return {dataSource,setdataSource}
} 
   