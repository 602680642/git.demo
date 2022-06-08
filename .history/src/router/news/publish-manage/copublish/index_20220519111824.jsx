import React from 'react'
import {Button,Table} from 'antd'
export default function NewsPublish(props) {
  
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
            
            //return <Button type='primary'>下线</Button>
            return <div>
            {

                items.publishState === 2 && <Button type='primary'  onClick= {()=> props.handlePublish(items)}>下线</Button>
            }
            {
                items.publishState === 1 && <Button type='primary'  onClick={()=> props.handleunPublish(items)}>发布</Button>
            
            }
            {
                
                items.publishState === 3 && <Button type='primary' onClick={()=> props.handleNews(items)}>发送草稿箱</Button>
            
            }
            </div>
          }  
        }
           
    ];
    return (
        <div>
         <Table rowKey={(items) => items.id} dataSource={props.dataSource} columns={columns} pagination = {{pageSize:5}}/>
        </div>
  )
}
