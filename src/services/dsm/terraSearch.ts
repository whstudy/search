// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 检索对象 POST /app/object/page/ */
export async function appObjectPage(
  body: {
    /** 桶名称列表 */
    buckets: string[];
    /** 对象的大小 */
    size: number;
    /** 对象大小的比较符，大于等于-gte,小于等于-lte */
    size_operator: string;
    /** 对象的名称 */
    name: string;
    /** 对象名称的匹配模式，分词匹配-tokenizer，完全匹配-total，前缀匹配-prefix，后缀匹配-suffix */
    name_match: string;
    /** 时间范围-开始时间 */
    start_time: string;
    /** 时间范围-结束时间 */
    end_time: string;
    /** 标签键值对 */
    tags: { key?: string; value?: string }[];
    /** 标签的匹配模式，，分词匹配-tokenizer，完全匹配-total，前缀匹配-prefix，后缀匹配-suffix */
    tags_match: string;
    /** 标签的关联关系，与-and， 或-or */
    tags_relation: string;
  },
  options?: { [key: string]: any },
) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: {
        id?: string;
        name?: string;
        bucket?: string;
        size?: number;
        owner?: string;
        create_time?: string;
        tags?: { key?: string; value?: string }[];
        version?: string;
      };
    } & API.RequestExtend
  >('/app/object/page/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下载对象 根据对象的id单个或批量下载对象 GET /app/object/download/ */
export async function appObjectDownloadGet(
  params?: {
    // query
    /** 对象的id */
    id?: any;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: Record<string, any> } & API.RequestExtend>(
    '/app/object/download/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取分享链接 根据对象的id和过期时间生成分享链接 GET /app/object/share_link/ */
export async function appObjectShareLinkGet(
  params?: {
    // query
    /** 对象id */
    id?: any;
    /** 链接有效期，单位是s, 范围是60-604800 */
    duration?: any;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: { link?: string } } & API.RequestExtend>(
    '/app/object/share_link/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取桶列表 查询登录用户拥有的桶列表 GET /app/bucket/list/ */
export async function appBucketListGet(options?: { [key: string]: any }) {
  return request<
    { code?: string; msg?: string; data?: { buckets?: string[] } } & API.RequestExtend
  >('/app/bucket/list/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新检索应用中存储的magnascale集群证书、域名、端口号 更新检索应用中存储的magnascale集群证书、域名、端口号 POST /app/cert/update/ */
export async function appCertUpdate(
  body: {
    /** 证书名称 */
    cert_name: string;
    /** 证书内容 */
    cert_data: string;
    /** 域名 */
    domain: string;
    /** https端口号 */
    port: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: Record<string, any> } & API.RequestExtend>(
    '/app/cert/update/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 查询检索应用中存储的magnascale集群证书、域名、端口号 查询检索应用中存储的magnascale集群证书、域名、端口号 GET /app/cert/info/ */
export async function appCertInfoGet(options?: { [key: string]: any }) {
  return request<
    {
      code?: string;
      msg?: string;
      data?: { cert_name?: string; cert_data?: string; domain?: string; port?: number };
    } & API.RequestExtend
  >('/app/cert/info/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询kibana的访问地址 查询kibana的访问地址 GET /app/kibana/address/ */
export async function appKibanaAddressGet(options?: { [key: string]: any }) {
  return request<{ code?: string; msg?: string; data?: { address?: string } } & API.RequestExtend>(
    '/app/kibana/address/',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 用户登录 管理员或普通用户登录 POST /app/user/login/ */
export async function appUserLogin(
  body: {
    /** 用户身份， 管理员-administrator，普通用户-user */
    role: string;
    /** 用户名 */
    username: string;
    /** 密码，使用base64编码后传递 */
    password?: string;
    /** 用户的access_key */
    access_key: string;
    /** 用户的secret_key,使用base64编码后传递 */
    secret_key: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: { token?: string } } & API.RequestExtend>(
    '/app/user/login/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 用户登出 管理员或普通用户登出 POST /app/user/logout/ */
export async function appUserLogout(
  body: {
    /** 用户名 */
    username: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code?: string; msg?: string; data?: Record<string, any> } & API.RequestExtend>(
    '/app/user/logout/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
