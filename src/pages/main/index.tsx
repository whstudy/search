import React, { useEffect, useState } from 'react';
import Search from './search'
import styles from './index.less';
import { Layout, Steps } from 'antd';
// import { Header, Sider } from 'antd/lib/layout/layout';
import WizardHeader from '@/components/WizardHeader';

const { Header, Sider, Content } = Layout;
const { Step } = Steps;

const Index: React.FC = () => {

  return (
    <>
      {/*<Header className={styles.headerwrapper}>
        
      </Header>
      <Sider></Sider>
      <PageContainer pageHeaderRender={false} className={styles.wizardContent}>
        <Search />  
      </PageContainer>*/}

      <Layout className={styles.searchBody}>
        <Header className={styles.headerwrapper}>
          <WizardHeader />
        </Header>
        <Layout>
          <Content className={styles.wizardContent}><Search /></Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Index;
