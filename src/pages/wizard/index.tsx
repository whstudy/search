import React, { useEffect, useState } from 'react';
import Search from './search'
import styles from './index.less';
import { Header } from 'antd/lib/layout/layout';
import WizardHeader from '@/components/WizardHeader';


const Index: React.FC = () => {

  return (
    <>
      <Header className={styles.headerwrapper}>
        <WizardHeader />
      </Header>
      <div className={styles.wizardContent}>
        <Search />  
      </div>
      {/*<PageContainer pageHeaderRender={false} className={styles.wizardContent}>
        
      </PageContainer>*/}
    </>
  );
};

export default Index;
