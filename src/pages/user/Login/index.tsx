import { Alert, message, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import ProForm, {ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import * as Lodash from 'lodash';
import { Base64 } from 'js-base64';
import Footer from '@/components/Footer';
import { appUserLogin } from '@/services/dsm/terraSearch';

import styles from './index.less';
import { setLocale } from '@@/plugin-locale/localeExports';
import { useLocalStorageState } from 'ahooks';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);


const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [fromDeploy, setFromDeploy] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.login & API.RequestExtend>();
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const formatDeployMode = useCallback((mode: string) => {
    let result = 'tfs';
    const modes = ['tfs', 'tos', 'tfs_tos'];
    if (!Lodash.isEmpty(mode)) {
      if (modes.includes(mode)) {
        result = mode;
      }
    }
    return result;
  }, []);

  const fetchInitialInfo = async () => {
    const currentUser = await initialState?.fetchUserInfo?.();

    const deployMode = localStorage.getItem('deployMode')?.split('_') || ['tfs'];

    if (currentUser) {
      await setInitialState((s) => ({
        ...s,
        currentUser,
        deployMode,
      }));
    }
  };
  
  const handleSubmit = async (values: API.LoginParams) => {
    localStorage.removeItem('deployRedirect');
    setSubmitting(true);
    try {
      const result = await appUserLogin({
        role: values.role,
        username: values.username,
        password: values.password&&Base64.encode(values.password),
        access_key: values.access_key,
        secret_key: values.access_key&&Base64.encode(values.secret_key),
      });
      const { data } = result;
      if ((result as any).success) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        const user = {name: values?.username, role: values.role};
        const token = data!.token!;
        const licenseCluster = data?.license_cluster;
        const licenseNodes = data?.license_nodes;
        const featurePACS = data?.feature_pacs;
        const featureTiering = data?.feature_tiering;
        const featureHDFS = data?.feature_hdfs;
        const stateRgwReady = data?.state_rgw_ready;
        const statePwdChanged = data?.state_pwd_changed;
        const stateOpenwizard = data?.state_openwizard;
        const rgwCacheEnabled = data?.rgw_cache_enabled; // 是否开启高速缓存
        const deployMode = formatDeployMode(data?.deploy_mode);

        const currentUser = {
          ...user,
          licenseCluster,
          licenseNodes,
        };
        const globalConfig = {
          featurePACS,
          featureTiering,
          featureHDFS,
          stateRgwReady,
          statePwdChanged,
          stateOpenwizard,
          rgwCacheEnabled,
        };

        localStorage.setItem('user', JSON.stringify(currentUser));
        localStorage.setItem('token', token);
        localStorage.setItem('visitTime', '0'); // 进入页面，用于 RightContent 组件
        localStorage.setItem('deployMode', deployMode);
        localStorage.setItem('globalConfig', JSON.stringify(globalConfig));
        localStorage.removeItem('wizardObjConfigStatus');
        await fetchInitialInfo();
        
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        history.push('/');
        return;
      }
      // 如果失败去设置用户错误信息
      setFromDeploy(false); // 登录失败后取消 loading
      message.error(result.msg);
      setUserLoginState(result);
    } catch (error) {
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultloginFailureMessage);
      console.log(error)
    }
    setSubmitting(false);
  };

  useEffect(() => {
 /*   if(!!localStorage.getItem('token')){
      history.push('/')
    }*/
    const { query } = history.location;
    const { p, e, source, type } = query as { redirect: string };
    e && setLocale(e, true);
    if (source === 'cluster') {
      const typeValue = type && Base64.decode(type).split('&&');
      setFromDeploy(true);
      handleSubmit({
        username: typeValue?.[0],
        password: typeValue?.[1],
      });
    } else if (!!p) {
      setFromDeploy(true);
      handleSubmit({
        username: `admin`,
        password: `passw0rd`,
        // username: `magnascale_cli`,
        // password: `MagnaScalePassw0rd`,
      });
      localStorage.setItem('deployRedirect', '1');
    }
  }, []);
  const success = userLoginState?.success;

  return (
    <div>
      {fromDeploy ? (
        <div className={styles.fromDeploy}>
          <Spin></Spin>
        </div>
      ) : (
        <div className={styles.container}>
          {/*<div className={styles.lang} data-lang>
            {SelectLang && <SelectLang />}
          </div>*/}
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <div>
                    <img src="lenovo.svg" alt="" className={styles.lenovo} />
                  </div>
                  {/*<img alt="logo" className={styles.logo} src="/logo-font.svg" />*/}
                  <div className={styles.logoFont}>
                    TerraSearch
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.main}>
              <div className={styles.loginTitle}>
                <hr/>
                <div className={styles.loginTitleText}>
                  登录  
                </div>
                <hr/>
              </div>
              <ProForm
                initialValues={{
                  role: `user`,
                  autoLogin: true,
                  username: '',
                  password: '',
                }}
                isKeyPressSubmit={true}
                submitter={{
                  searchConfig: {
                    submitText: intl.formatMessage({
                      id: 'pages.login.submit',
                      defaultMessage: '登录',
                    }),
                  },
                  render: (_, dom) => dom.pop(),
                  submitButtonProps: {
                    loading: submitting,
                    size: 'large',
                    style: {
                      width: '100%',
                    },
                  },
                }}
                onFinish={async (values) => {
                  handleSubmit(values as API.LoginParams);
                }}
              >
                {success && (
                  <LoginMessage
                    content={intl.formatMessage({
                      id: 'pages.login.accountLogin.errorMessage',
                      defaultMessage: '账户或密码错误',
                    })}
                  />
                )}

                <ProFormSelect
                  allowClear={false}
                  name={`role`}
                  options={[
                    {value: `user`, label: `普通用户`},
                    {value: `administrator`, label: `管理员`}
                  ]}
                />
                <ProFormText
                  name="username"
                  // fieldProps={{
                  //   size: 'large',
                  //   prefix: <UserOutlined className={styles.prefixIcon} />,
                  // }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名: admin or user',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="用户名是必填项！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormDependency name={['role']}>
                  {(depValue) => {
                    if (depValue?.role===`user`) {
                      return (
                        <>
                          <ProFormText
                            name="access_key"
                            // fieldProps={{
                            //   size: 'large',
                            //   prefix: <LockOutlined className={styles.prefixIcon} />,
                            // }}
                            placeholder={intl.formatMessage({
                              id: 'pages.login.AK.placeholder',
                              defaultMessage: '请输入AK',
                            })}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage
                                    id="pages.login.password.required"
                                    defaultMessage="请输入密码！"
                                  />
                                ),
                              },
                            ]}
                          />
                          <ProFormText.Password
                            name="secret_key"
                            placeholder={intl.formatMessage({
                              id: 'pages.login.SK.placeholder',
                              defaultMessage: '请输入SK',
                            })}
                            rules={[
                              {
                                required: true,
                                message: (
                                  <FormattedMessage
                                    id="pages.login.password.required"
                                    defaultMessage="请输入密码！"
                                  />
                                ),
                              },
                            ]}
                          />
                        </>
                      );
                    } else {
                      return <ProFormText.Password
                        name="password"
                        placeholder={intl.formatMessage({
                          id: 'pages.login.password.placeholder',
                          defaultMessage: '请输入密码',
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage
                                id="pages.login.password.required"
                                defaultMessage="请输入密码！"
                              />
                            ),
                          },
                        ]}
                      />;
                    }
                  }}
                </ProFormDependency>
              </ProForm>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Login;
