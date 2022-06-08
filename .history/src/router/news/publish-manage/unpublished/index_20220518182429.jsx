import React,{} from 'react'
import axios from 'axios'
export default function UnPublish() {

  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
     
    axios.get(`/news?author=${username}&publishState=1&_expand=categroy`
    ).then(res =>{

        console.log(res.data)
        setdataSource(res.data)
    })

  },[username])
  return (
    <div>NewsAdd</div>
  )
}
