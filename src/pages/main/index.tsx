import React, { StrictMode } from 'react';
import Search from './search'
import styles from './index.less';
import { Layout, Steps } from 'antd';
// import { Header, Sider } from 'antd/lib/layout/layout';
import LnHeader from '@/components/Header';

const { Header, Sider, Content } = Layout;
const { Step } = Steps;

const Index: React.FC = (props) => {

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
          <LnHeader />
        </Header>
        <Layout>
          <Content className={styles.wizardContent}>{props.children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Index;
