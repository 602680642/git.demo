import React from 'react'
import {Button,Table} from 'antd'
export default function coPublish() {
  
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
    
                 <Button type='primary'  onClick={()=> {handleUnPublish(items)}}>下线</Button>
              }
               
            </div>
          }
        },
      ];
    return (
        <Table rowKey={(items) => items.id}  columns={columns} pagination = {{pageSize:5}}/>
  )
}
