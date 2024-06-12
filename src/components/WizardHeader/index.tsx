import { useModel, SelectLang, Link, history } from 'umi';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Space, message, Modal } from 'antd';
import { SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Avatar from '../RightContent/AvatarDropdown';
import styles from './index.less';
import { isNotEmpty } from '@/utils';
import IconFont from '../IconFont';

export type SiderTheme = 'light' | 'dark';

const Help: React.FC = () => {
  return (
    <span
      className={styles.action}
      onClick={() => {
        window.open('/help/Lenovo MagnaScale Manager 用户指南.pdf');
      }}
    >
      <IconFont type="icon-bangzhu" style={{ fontSize: '22px' }} />
    </span>
  );
};

const Setting: React.FC = () => {
  return (
    <span className={styles.action}>
      <SettingOutlined />
    </span>
  );
};

const WizardHeaderRight: React.FC = () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    const licenseInfo = initialState?.currentUser?.licenseCluster;
    const licenseNodes = initialState?.currentUser?.licenseNodes;
    const statePwdChanged = initialState?.globalConfig?.statePwdChanged;
    /** 授权 */
    const days = licenseInfo?.days_remaining || 1; // 获取集群过期时间
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
  }, [history.location.pathname]);

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className={styles.header}>
      <Space className={styles.lef}>
        <div className={styles.header_logo} id="logo">
          <a>
            <img src="/logo-white.svg" alt="logo" />
          </a>
        </div>
        <div className={styles.featureName}>智能检索</div>
      </Space>

      <Space className={styles.rightContent}>
        {localStorage.getItem('deployRedirect') !== `1` && (
          <>
            <Avatar className={styles.rightContent} />
          </>
        )}
      </Space>
    </div>
  );
};
export default WizardHeaderRight;
