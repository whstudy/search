import { useModel} from 'umi';
import React from 'react';
import { Space} from 'antd';
import Avatar from '../RightContent/AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';



const LnHeader: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className={styles.header}>
      <Space className={styles.lef}>
        <div className={styles.header_logo} id="logo">
          <img src="/lenovo-white.svg" alt="logo" />
          <div>TerraSearch</div>
        </div>
      </Space>

      <Space className={styles.rightContent}>
        {localStorage.getItem('deployRedirect') !== `1` && (
          <>
            <Avatar/>
          </>
        )}
      </Space>
    </div>
  );
};
export default LnHeader;
