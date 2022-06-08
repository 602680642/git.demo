import React from 'react'
import {Button,Table} from 'antd'
export default function coPublish(props) {
  
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
          title: '操作',
          
          render:(items)=>{
            
            return <div>
            {

                items.publishState === 2 && <Button type='primary'  handlePublish = {props.handlePublish(items)}>下线</Button>
            }
            {
                items.publishState === 1 && <Button danger  onClick={()=> {handleback(items)}}>发布</Button>
            
            }
            {
                
                items.publishState === 3 && <Button type='red'  onClick={()=> props.history.push(`/news-manage/update/${items.id}`)}>查看</Button>
            
            }
            </div>
      }
           
      ];
    return (
        <Table rowKey={(items) => items.id} dataSource={props.dataSource} columns={columns} pagination = {{pageSize:5}}/>
  )
}
