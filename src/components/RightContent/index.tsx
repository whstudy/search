import { useModel, SelectLang, history, Access } from 'umi';
import React from 'react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Space, message, Modal, Button, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import { isNotEmpty } from '@/utils';
import IconFont from '../IconFont';

export type SiderTheme = 'light' | 'dark';
const JobSyncInterval = 10 * 1000;

// 这里组件渲染了约超过30次，原因未知
const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
/*    if(JSON.parse(localStorage.getItem('user')||`{}`)?.role === `user`){
      history.push('/search');
    } else {
      history.push('/cluster');
    }*/
    
    if (localStorage.getItem('deployRedirect')) {
      history.replace('/user/login');
    }
  }, [history.location.pathname]);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
