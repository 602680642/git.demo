import React,{use} from 'react'

export default function Publish() {

  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  return (
    <div>NewsDraft</div>
  )
}
