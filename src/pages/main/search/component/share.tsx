import React, {useEffect, useState} from 'react';
import styles from '../index.less';
import {Input, message, Select, Space, Spin, Typography} from "antd";
import {dsmShareLink} from "@/services/dsm/objSearch";
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
  const [shareLink, setShareLink] = useState<any>();
  const [loading, setLoading] = useState<any>();

  const getShareLink = async (e) => {
    setLoading(true);
    console.log(e.target.value)
    const _objParams = {
      ...objParams,
      duration: e.target.value*24*60*60,
    }
    try{
      const res: any = await dsmShareLink(_objParams, {});
      if(res.code === '2'){
        message.error(
          res.msg,
        );
      }
      setShareLink(res.data)  
    }catch (error: any) {
      message.error(
        error,
      );
    }finally {
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    getShareLink({
      target: {
        value: 1
      }
    })
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
              <Input.Group compact className={styles.shareTime}>
                <Input onChange={getShareLink} className={styles.shareInput} defaultValue={1}/>
                <Select options={unitOptions} defaultValue={shareTime}/>
              </Input.Group>

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
