import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button,Modal} from 'antd'
import { DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
const { confirm } = Modal
export default function NewsCategory() {

  const [dataSource, setdataSource] = useState([])
  useEffect(() => {

    axios.get('/categories').then(res => {

     console.log(res.data);
      setdataSource(res.data)
    })
  }, [])

  const delItem = (items) => {

    confirm({
      title: 'Do you Want to delete this item?',
      icon: <ExclamationCircleOutlined />,

      onOk() {

        //删除后要与后台同步
        setdataSource(dataSource.filter(item => item.id !== items.id))
        axios.delete(`/categories/${items.id}`)

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
     
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: title,
        title: 栏目名称,
        handleSave: this.handleSave,
      }),
    },

    {
      title: '操作',

      render: (items) => {

        return <div>
          <Button danger onClick={() => delItem(items)} shape='circle' icon={<DeleteOutlined />} style={{ marginRight: '10px' }} />

        </div>
      }
    },
  ];
  return (
    <Table rowKey={(items) => items.id} dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} 
     components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    />
  )
}
