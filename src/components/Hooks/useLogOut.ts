import { appUserLogout } from '@/services/dsm/terraSearch';
import { useModel, history } from 'umi';
import { stringify } from 'querystring';

/**
 * 登入登出等操作
 */
export default () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const logout = async (callback?: () => void) => {
    try {
      // const res = await appUserLogout({ name: currentUser?.name as string });
      // if (res?.success) {
        callback && callback();
        // Note: There may be security issues, please note
        history.replace({
          pathname: '/user/login',
        });
      // }
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('wizaDefSetting');
      localStorage.removeItem('isCloseUnauthorizedPairTip');
      sessionStorage.removeItem('globalJobQueue');
      sessionStorage.removeItem('globalSearchResoure');
      // ... to be finished
    }
  };

  return {
    logout,
  };
};
