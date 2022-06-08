import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {PageHeader,Steps,Button,Form,Input, Select, message, notification} from 'antd'
import style  from '../newsstyle/new.module.css'
import NewDraft from '../newdraft'
const { Step } = Steps;
const {Option} = Select
export default function NewsAdd(props) {
  //当前状态
  const [cuState,setcuState] = useState(0)
  
  const [cateData,setcateData] = useState([])
  const [info,setinfo] = useState({})
  const [content,setcontent] = useState('')
  const tref = useRef(null)
  const user = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{

     axios.get('/categories').then(res =>{

        setcateData(res.data)
     })
  },[])
  //下一步
  const nextStep = () =>{
   //如果是第一步填好信息后校验数据，通过后保存输入信息并进行下一步
   if(cuState === 0){

      tref.current.validateFields().then(val =>{
        setinfo(val)
        setcuState(cuState + 1)

      }).catch(err => err.message)

      //否则就是第二步，校验内容是否为空，通过后再下一步
   }else {
      
     if(content === '' || content.trim() === '<p></p>'){
        
        message.error('输入不能为空')
     }
      else  setcuState(cuState + 1)
    }
  }
  //上一步
  const preStep = () =>{

    setcuState(cuState - 1)
  }
  //保存到草稿箱或提交审核
  const Submit = (auditState) =>{

     //往后台添加
     axios.post('/news',{

         ...info,
         'content':content,
         'region':user.region ? user.region : '全球',
         'author':user.username,
         'roleId':user.roleId,
         'auditState':auditState,
         'publishState':0,
         'createTime':Date.now(),
         'star':0,
         'view':0
     }).then(res =>{

      //如果为0就跳转到草稿箱，为1就是提交审核
       props.history.push(auditState === 0 ? 'news-manage/draft' : 'audit-manage/list')          
      //通知栏
       notification.info({

             message:'通知',
             description:`您可以到${auditState === 0 ? '草稿箱' : '审核列表'}中查看您的新闻`,
             placement:'bottomRight'
       })
      })
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        
        title="撰写新闻"
        subTitle="This is a subtitle"
      />

     <Steps current={cuState}>
      <Step title="基本信息" description="新闻标题，新闻分类" />
      <Step title="新闻内容" description="新闻主体内容"  />
      <Step title="新闻提交" description="保存草稿或者提交审核" />
    </Steps>

    <div style={{margin:'30px 0px'}}>

      <div className={cuState === 0 ? '' : style.curstep}>
      <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      ref = {tref}
      //autoComplete="off"
      
    >
     
      <Form.Item
        label="新闻标题"
        name="title"
        
        rules={[{ required: true, message: '请输入标题!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="新闻分类"
        name="categoryId"
        rules={[{ required: true, message: '请选择分类' }]}
      >
        <Select>
          {

              cateData.map(item =>{

                 return <Option key={item.id} value={item.id}>{item.title}</Option>
              })
          }
          
        </Select>
      </Form.Item>
      </Form>
      </div >
      <div className={cuState === 1 ? '' : style.curstep}>
       <NewDraft getdata = {(val)=>{
           
           setcontent(val)
       }}/>
      </div>
      <div className={cuState === 2 ? '' : style.curstep}>
          
      </div>
    </div>

    <div>
       {
         
        cuState < 2 && <Button onClick={nextStep} type = 'primary'>下一步</Button>
       }
       {
         
         cuState > 0 && <Button onClick={preStep}>上一步</Button>
       }
       {
        cuState === 2 && <span>
            <Button onClick={() => Submit(0)}>保存草稿箱</Button>
            <Button onClick={() => Submit(1)}>提交审核</Button>
         </span>
       }
      
    </div>
  </div>
  )
}
