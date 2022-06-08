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
  dataIndex:'categroy',
  
},

