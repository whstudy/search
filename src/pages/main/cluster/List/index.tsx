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
  Popover
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
import { ProFormUploadButton } from '@ant-design/pro-form';

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
    setDataSource(res.data?.list)
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
      buckets: values?.bucket?.map(o=>{
        const oArr = o.split('-')
        return {owner: oArr[0] == 'null' ? null : oArr[0], name: oArr[1]}
      }),
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
    const bucketRes: any = await appBucketListGet({}, {});
    for (let i = 0; i < bucketRes.data.length; i++) {
      bucketListTemp.push({
        label: `${bucketRes.data[i].name}${bucketRes.data[i].owner?`（租户：${bucketRes.data[i].owner}）`:''}`,
        value: `${bucketRes.data[i].owner}-${bucketRes.data[i].name}`,
      })
    }
    setBucketList(bucketListTemp)
  }

  useEffect(() => {
    getBucket()
    getDataSource()
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
            集群监控
          </div>
        }
      >
        <div>
          <Space className={styles.searchForm}>
            集群监控请访问：Kibana.com
          </Space>
        </div>
      </ProCard>

      <ProCard title={
        <div className={styles.demoTitleDiv}>
          配置修改
        </div>
      } className={styles.table}>
        <div className={styles.form}>
          <Space className={styles.searchForm}>
            <Form
              layout={"vertical"}
              onFinish={onFinish}
              form={form}
            >

              <Form.Item label={' 存储集群业务访问域名'} name={'domain_name'}>
                <Input/>
              </Form.Item>

              <Form.Item label={'HTTPS端口'} name={'https_port'}>
                <Input/>
              </Form.Item>

              <Form.Item hidden name={'certificate_content'}>
                <Input/>
              </Form.Item>

              <ProFormUploadButton
                accept={`.crt`}
                name="certificate_filename"
                label={`导入证书`}
                title={`导入证书`}
                max={1}
                listType="text"
                fieldProps={{
                  name: 'file',
                  beforeUpload: file => {
                    return false;
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="setUp.selectFile" defaultMessage="请选择文件" />,
                  },
                ]}
              />

              <Space className={styles.btnGroup}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Space>
        </div>
      </ProCard>
    </>
  );
};
export default SearchList;