import type { ActionType } from '@ant-design/pro-table';
import {
  Button,
  Form,
  Input,
  message,
  Space,
  Table,
  DatePicker,
  Select,
  Modal,
  Tooltip,
  Popover,
  InputNumber
} from 'antd';
import { FormattedMessage } from 'umi';
import React, { useRef, useState, useEffect } from 'react';
import styles from '../index.less';
import moment from 'moment';
import {appObjectPage, appBucketListGet, appObjectDownloadGet} from '@/services/dsm/terraSearch';
import {formatUnit} from "@/utils";
import Share from "../component/share";
import ProCard from "@ant-design/pro-card";
import { saveAs } from 'file-saver';
import { InfoCircleOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

let paramsObject: any = {
  page: 1,
  page_size: 10,
}

const SearchList = (props) => {
  const ref = useRef<ActionType>();
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<any>();
  const [bucketList, setBucketList] = useState<any>();
  const [total, setTotal] = useState();
  const [current, setCurrent] = useState(1);

  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const [downloadArr, setDownloadArr] = useState<any>();

  const [objParams, setObjParams] = useState()

  const getDataSource = async () => {
    const res: any = await appObjectPage(paramsObject, {});
    if(res.code === '2'){
      message.error(
        res.msg,
      );
    }
    setDataSource(res.data?.items)
    setTotal(res.data.total)
  }

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = (values) => {
    paramsObject.page = 1
    setCurrent(1)
    paramsObject = {
      ...paramsObject,
      ...values,
      name_match: values.name_match,
      tags: values?.tags?.filter((o)=>{return o.key&&o.value}),
      tags_match: values.tags_match,
      tags_relation: values.tags&&values.tags.length!=0&&values.tags_relation,
      name: values.name,
      size_operator: values.size_operator,
      unit: undefined,
      size: values.size * values.unit || undefined
    }
    paramsObject.time = undefined
    if(values.time){
      paramsObject.start_time = moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss')
      paramsObject.end_time = moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    getDataSource()
  }

  const getBucket = async () => {
    const bucketListTemp: any = []
    const bucketRes: any = await appBucketListGet({});
    for (let i = 0; i < bucketRes.data.buckets.length; i++) {
      bucketListTemp.push({
        label: bucketRes.data.buckets[i],
        value: bucketRes.data.buckets[i],
      })
    }
    setBucketList(bucketListTemp)
  }

  useEffect(() => {
    getBucket()
  }, [])

  const shareObj = (record) => {
    setObjParams({
      name: record.name,
      bucket: record.bucket,
      owner: record.owner,
    })
    setConfirmVisible(true);
  };

  const onChange = (pagination, filter, sorter, extra) => {
    const orderMap = {
      ascend: 'asc',
      descend: 'desc',
    }
    if(extra.action!=="paginate"){
      paramsObject.sort_field = sorter.order&&sorter.field
      paramsObject.order = orderMap[sorter.order]
      paramsObject.page = 1
      setCurrent(1)
    }else{
      paramsObject.page = pagination.current
      paramsObject.page_size = pagination.pageSize
      setCurrent(pagination.current)
    }
    getDataSource()
  }

  const unitOptions = [
    {
      label: 'B',
      value: 1,
    },
    {
      label: 'KB',
      value: 1*1024,
    },
    {
      label: 'MB',
      value: 1*1024*1024,
    },
    {
      label: 'GB',
      value: 1*1024*1024*1024,
    },
    {
      label: 'TB',
      value: 1*1024*1024*1024*1024,
    },
  ]

  const options: any = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setDownloadArr(selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const objDownLoad = async (e) => {
    const _downloadArr = e.record || downloadArr
    for(const record of _downloadArr){
      const result: any = await appObjectDownloadGet(
        {
          name: record.name,
          bucket: record.bucket,
          owner: record.owner,
        },
{ parseResponse: false }
      );

      const blob = await result.blob();
      const fileName = `${record.name}`;
      saveAs(blob, fileName);
    }
  }
  
  return (
    <>
      <ProCard
        className={styles.searchListTop}
        title={
          <div className={styles.demoTitleDiv}>
            对象检索
            <Tooltip title={
              <div className={styles.searchTooltip}>
                <div>查询模式</div>
                <div className={styles.content}><div>■</div> 完全匹配：文本关键词和搜索关键字一致</div>
                <div className={styles.content}><div>■</div> 分词匹配：对文本进行分词处理并基于分词结果进行查询</div>
                <div className={styles.content}><div>■</div> 前缀匹配：支持前缀模糊搜索</div>
                <div className={styles.content}><div>■</div> 后缀匹配：支持后缀模糊搜索</div>
              </div>
            } placement="rightBottom">
              <InfoCircleOutlined className="term-explan-icon" />
            </Tooltip>
          </div>
        }
      >
        <div>
          <Space className={styles.searchForm}>
            <Form
              onFinish={onFinish}
              initialValues={
                {tags: [{value: ``, label: ``}]}
              }
              form={form}
            >
              <Form.Item label={'所属桶'} name={'buckets'}>
                <Select
                  size={'middle'}
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择所属桶"
                  // defaultValue={['a10', 'c12']}
                  onChange={handleChange}
                  options={bucketList}
                />
              </Form.Item>
  
              <Space>
                <Form.Item label={'对象大小'}>
                  <Input.Group compact>
                    <Form.Item name={'size_operator'} style={{marginBottom: 0}}>
                      <Select placeholder={'请选择'}>
                        <Option value="gte">大于等于</Option>
                        <Option value="lte">小于等于</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={'size'} style={{marginBottom: 0}}>
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item name={'unit'} initialValue={1} style={{marginBottom: 0}}>
                      <Select options={unitOptions}/>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>

                <Form.Item label={'对象名称'} name={'name'}>
                  <Input/>
                </Form.Item>

                <Form.Item name={'name_match'} initialValue={`total`}>
                  <Select options={[
                    // {label: `分词匹配`, value: `tokenizer`},
                    {label: `完全匹配`, value: `total`},
                    // {label: `前缀匹配`, value: `prefix`},
                    // {label: `后缀匹配`, value: `suffix`},
                  ]}/>
                </Form.Item>
                
                <Form.Item label={'创建时间'} name={'time'}>
                  <RangePicker showTime={true}/>
                </Form.Item>
              </Space>

              <div className={styles.tagDiv}>
                <Form.Item label="标签" name="tags">
                  <Form.List name="tags">
                    {(tagsFields, tagsOpt) => (
                      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                        {tagsFields.map((tagsField, index) => (
                          <Space key={tagsField.key}>
                            <Form.Item noStyle name={[tagsField.name, 'key']}>
                              <Input placeholder="键" />
                            </Form.Item>
                            <Form.Item noStyle name={[tagsField.name, 'value']}>
                              <Input placeholder="值" />
                            </Form.Item>
                            {tagsFields.length > 1 && <a onClick={() => {
                              tagsOpt.remove(tagsField.name);
                            }}>删除</a>}
                            {( tagsFields.length < 10 && index + 1 === tagsFields.length ) && <a onClick={() => tagsOpt.add()}>添加</a>}
                          </Space>
                        ))}
                        {/*<Space>
                          <Button style={{width: '100px'}} onClick={() => tagsOpt.add()} block>
                            添加
                          </Button>
                        </Space>*/}
                      </div>
                    )}
                  </Form.List>
                </Form.Item>

                <Space className={styles.tagSelect}>
                  <Form.Item noStyle name={'tags_match'} initialValue={`total`}>
                    <Select options={[
                      // {label: `分词匹配`, value: `tokenizer`},
                      {label: `完全匹配`, value: `total`},
                      // {label: `前缀匹配`, value: `prefix`},
                      // {label: `后缀匹配`, value: `suffix`},
                    ]}/>
                  </Form.Item>
                  <Form.Item noStyle name={'tags_relation'} initialValue={`and`}>
                    <Select options={[
                      {label: `与`, value: `and`},
                      {label: `或`, value: `or`},
                    ]}/>
                  </Form.Item>
                </Space>
              </div>
              
              <Space className={styles.btnGroup}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    检索
                  </Button>
                </Form.Item>
  
                <Form.Item>
                  <Button onClick={onReset}>
                    重置
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Space>
        </div>
      </ProCard>

      <ProCard title={''} className={styles.table}>
        <Space className={styles.searchForm}>
        <Button htmlType="submit" onClick={objDownLoad}>
          批量下载
        </Button>
      </Space>
        <Table
          showSorterTooltip={false}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={[
            {
              title: '对象名称',
              dataIndex: 'name',
              key: 'name',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
              render: (text, record) => (
                <div className={styles.tableNameTitle}>
                  <span title={record.name} className={styles.gatewaysNameSpan}>
                    {record.name}
                  </span>
                </div>
              ),
            },
            {
              title: "操作",
              key: 'operation',
              render: (text, record) => (
                <Space size="middle">
                  <a
                    // href={`/dsm/object/download/?name=${record.name}&bucket=${record.bucket}&owner=${record.owner}`}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      e.record = [record]
                      objDownLoad(e);
                    }}
                  >
                    下载
                  </a>
                  <a
                    onClick={() => {
                      shareObj(record);
                    }}
                  >
                    分享
                  </a>
                </Space>
              ),
            },
            {
              title: '版本号',
              dataIndex: 'version',
              key: 'version',
            },
            {
              title: '大小',
              dataIndex: 'size',
              key: 'size',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
              render: (text, record) => (
                <div className={styles.tableNameTitle}>
                  {formatUnit(record.size)}
                </div>
              ),
            },
            {
              title: '用户名',
              dataIndex: 'owner',
              key: 'owner',
              /*sorter: true,
              sortDirections: ['descend', 'ascend'],*/
              render: (text, record) => {
                const ownerName = text.split('$').length == 2 ? `${text.split('$')[1]}(租户名：${text.split('$')[0]})` : text
                return (<div className={styles.tableNameTitle}>
                  <span title={ownerName} className={styles.gatewaysNameSpan}>
                    {ownerName}
                  </span>
                </div>)
              },
            },
            {
              title: '所属桶',
              dataIndex: 'bucket',
              key: 'bucket',
              sorter: true,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: '标签',
              dataIndex: 'tags',
              key: 'tags',
              render: (val: any) =>
                /*<Tooltip placement="top" defaultOpen={true} title={<div className={styles.tagContainer}>
                  {val?.map(tag => <span className={styles.tag}>{tag}</span>)}
                </div>}>
                  <div>{val?.slice(0, 2).map(tag => <span className={styles.tag}>{tag}</span>)}{val?.length>2&&`· · ·`}</div>
                </Tooltip>*/
                <Popover placement="top" content={<div className={styles.tagContainer} defaultVisible={true}>
                  {val?.map((tag, index) => <span key={index} className={styles.tag}>{tag.key}:{tag.value}</span>)}
                </div>}>
                  <div className={styles.tagContainerTable}>{val?.slice(0, 2).map(tag => <span key={tag} className={styles.tag}>{tag.key}:{tag.value}</span>)}{val?.length>2&&`· · ·`}</div>
                </Popover>
            },
            {
              title: "创建时间",
              dataIndex: 'create_time',
              key: 'create_time',
              sorter: true,
              render: (val: number) => `${moment(val).format('YYYY-MM-DD HH:mm:ss')}`,
            },
          ]}
          pagination={{
            total: total,
            current: current,
          }}
          scroll={{ x: 1500 }}
          actionRef={ref}
          dataSource={dataSource}
          rowKey="id"
          onChange={onChange}
        />
      </ProCard>
      <Modal
        centered
        title={'分享'}
        visible={confirmVisible}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setConfirmVisible(false)}
      >
        <Share objParams={objParams}/>
      </Modal>
    </>
  );
};
export default SearchList;
