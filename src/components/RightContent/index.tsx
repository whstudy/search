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
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentCluster, globalConfig } = initialState || {};
  const clusterId = currentCluster?.id || '';

  useEffect(() => {
    const licenseInfo = initialState?.currentUser?.licenseCluster;
    const licenseNodes = initialState?.currentUser?.licenseNodes;
    const openwizard = initialState?.globalConfig?.stateOpenwizard;
    const statePwdChanged = initialState?.globalConfig?.statePwdChanged;

    if (localStorage.getItem('deployRedirect')) {
      history.replace('/user/login');
    }
    if (openwizard) {
      // 增加向导配置跳转逻辑
      history.replace('/wizard');
    } else {
      /** 授权 */
      const days = licenseInfo?.days_remaining || 1; // 获取集群过期时间
      // 集群过期时拦截更改路由跳转
      if (days <= 0 && history.location.pathname !== '/expired') {
        history.replace('/expired');
      }

      // 集群和节点即将过期时 仅跳转提示一次
      const showTag = localStorage.getItem('visitTime'); // 解决每次刷新页面时都会有集群即将过期提醒
      if (
        (JSON.stringify(licenseInfo) !== '{}' && days > 0) ||
        JSON.stringify(licenseNodes) !== '[]'
      ) {
        Modal.destroyAll(); // 手动更改浏览器地址时关闭弹框
        if (showTag === '0') {
          localStorage.setItem('visitTime', '1');
          history.replace('/expired');
        }
      }
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
