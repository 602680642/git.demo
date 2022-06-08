import { useState,useEffect } from "react"
export default function Publish() {

    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setdataSource] = useState([])
    useEffect(()=>{
       
      axios.get(`/news?author=${username}&publishState=2&_expand=categroy`
      ).then(res =>{
  
          console.log(res.data)
          setdataSource(res.data)
      })
  
    },[username])
  
   