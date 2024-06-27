import React, {useEffect, useState} from 'react';
import styles from '../index.less';
import {Form, Input, InputNumber, message, Select, Space, Spin, Typography} from "antd";
import {appObjectShareLinkGet} from "@/services/dsm/terraSearch";
import {FormattedMessage} from "umi";

type routeProps = {
  objParams: any;
  setTaskStatus: any;
  rStatePage: boolean;
  afterOperation: (val: any) => void;
};

const Share: React.FC<routeProps> = ({
                                       objParams,
                                     }) => {

  const [form] = Form.useForm();
  const [shareLink, setShareLink] = useState<any>();
  const [loading, setLoading] = useState<any>();
  
  const getShareLink = async (e, allFields) => {
    if (!(allFields.size*allFields.unit)) {
      message.error(
        `请输入时间`
      );
      return
    }
    if (allFields.size*allFields.unit>604800) {
      message.error(
        `最小1分钟，最大7天`
      );
      return
    }
    setLoading(true);
    console.log(allFields)
    const _objParams = {
      ...objParams,
      duration: allFields.size*allFields.unit,
    }
    try{
      const res: any = await appObjectShareLinkGet(_objParams, {});
      if(res.code === '2'){
        message.error(
          res.msg,
        );
      }
      setShareLink(res.data.link)  
    }catch (error: any) {
      message.error(
        error,
      );
    }finally {
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    getShareLink(null,{size: 1, unit: 60})
  },[])

  const unitOptions = [
    {
      label: '分钟',
      value: 60,
    },
    {
      label: '小时',
      value: 60*60,
    },
    {
      label: '天',
      value: 60*60*24,
    },
  ]

  const shareTime = 60

  return (
    <Spin spinning={loading}>
      <Space direction="vertical">
        <div className={styles.shareContainer}>
          <span className={styles.shareLabel}>文件名</span>
          <span className={styles.shareContent}>{objParams.name}</span>
        </div>
        <div className={styles.shareContainer}>
          <span className={styles.shareLabel}>链接</span>
          <span className={styles.shareContent}>
            <span className={styles.shareTop}>
              {/*<Input.Group compact className={styles.shareTime}>
                <Input onChange={getShareLink} className={styles.shareInput} defaultValue={1}/>
                <Select options={unitOptions} defaultValue={shareTime}/>
              </Input.Group>*/}

              <Form
                onValuesChange={getShareLink}
                form={form}
              >
                <Form.Item noStyle>
                  <Input.Group compact className={styles.shareTime}>
                    <Form.Item name={'size'} initialValue={5} noStyle rules={[
                      {
                        required: true,
                        message: `请输入时间`,
                      },
                    ]}>
                      <InputNumber className={styles.shareInput} min={1}/>
                    </Form.Item>
                    <Form.Item name={'unit'} initialValue={60} noStyle>
                      <Select options={unitOptions}/>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Form>

              <span>天后失效</span>
            </span>
            <div className={styles.shareLink}>{shareLink}</div>
            <Typography.Paragraph
              copyable={{
                text: shareLink,
                icon: [<></>, <></>],
              }}
            >
              复制链接
            </Typography.Paragraph>
          </span>
        </div>
      </Space>
    </Spin>
  );
};
export default Share;
