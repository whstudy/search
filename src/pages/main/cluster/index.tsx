import type { ActionType } from '@ant-design/pro-table';
import {
  Button,
  Form,
  Input,
  message,
  Space,
  Spin,
} from 'antd';
import { FormattedMessage } from 'umi';
import React, { useRef, useState, useEffect } from 'react';
import styles from './index.less';
import {appKibanaAddressGet, appCertUpdate, appCertInfoGet} from '@/services/dsm/terraSearch';
import ProCard from "@ant-design/pro-card";
import { ProFormUploadButton } from '@ant-design/pro-form';



const SearchList = (props) => {
  const [form] = Form.useForm();
  const [kibana, setKibana] = useState()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDataSource = async () => {
    setIsLoading(true)
    const kibanaRes: any = await appKibanaAddressGet({});
    setKibana(kibanaRes.data.address)
    const certInfoRes: any = await appCertInfoGet({});
    form?.setFieldsValue({
      ...certInfoRes.data,
      cert_name: certInfoRes?.data?.cert_name?[{
        name: certInfoRes?.data?.cert_name,
        originFileObj:  new Blob([certInfoRes?.data?.cert_data||``])
      }]:[],
    });
    setIsLoading(false)
  }

  const onFinish = async (values) => {
    const reader = new FileReader();
    reader.readAsText(values.cert_name?.[0].originFileObj);
    reader.onloadend = async (e: any) => {
      try {
        setIsLoading(true)
        const res: any = await appCertUpdate({ ...values, cert_name: values.cert_name?.[0]?.name, cert_data: e?.target?.result  });
        console.log(res)
        if ((res as any).success) {
          message.success(res?.msg);
          return true;
        }
        message.error(res?.msg);
        return false;
      } catch (error) {
        return false;
      } finally {
        setIsLoading(false)
      }
    }
  }
  
  useEffect(() => {
    getDataSource()
  }, [])

  const options: any = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  
  return (
    <Spin spinning={isLoading}>
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
            集群监控请访问：<a target={`_blank`} href={kibana}>{kibana}</a>
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

              <Form.Item label={' 存储集群业务访问域名'} name={'domain'}>
                <Input/>
              </Form.Item>

              <Form.Item label={'HTTPS端口'} name={'port'}>
                <Input/>
              </Form.Item>

              <Form.Item hidden name={'cert_data'}>
                <Input/>
              </Form.Item>

              <ProFormUploadButton
                accept={`.crt`}
                name="cert_name"
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
    </Spin>
  );
};
export default SearchList;
