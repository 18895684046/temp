import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { Base64 } from 'js-base64';
import { RELOGIN_CODES, NO_PERMISSION_CODES } from './errorCode';

const service = axios.create({
  // 当传入的url为绝对路径时 不起作用
  baseURL: '/api',

  // 允许跨域携带cookie
  withCredentials: true,

  // 超时时间60秒
  timeout: 60000,
});

// 拦截器 处理响应
service.interceptors.response.use(
  (response) => {
    if (response?.data?.success === false) {
      // 错误处理 由于有些接口不会返回success字段，所以需要显示判断是否等于false
      console.error(response?.data?.message || response?.data?.data || '未知错误');
      return Promise.reject(response.data);
    } else {
      // 请求成功返回数据
      return response.data;
    }
  },

  (error) => {
    const { data, status } = error?.response;
    const errcode = data?.errcode || 0;
    const msg = data?.message || '';

    if (RELOGIN_CODES.includes(errcode) && status === 401) {
      // 清除cookie重新登录
      Cookies.remove('fullname');
      Cookies.remove('email');
      window.location.href = `${import.meta.env.VITE_LOGIN_URL}?next=${Base64.encode(
        window.location.href,
      )}`;
    } else if (NO_PERMISSION_CODES.includes(errcode)) {
      // todo 在此添加项目无权限时处理逻辑

      window.location.href = `/#/no_permission`;
    } else {
      msg && console.error(msg);
    }

    return Promise.reject(error);
  },
);

// 返回 Promise
const request = (config: AxiosRequestConfig): Promise<any> => {
  let { url, params } = config;

  // 获取url中所有的动态参数名
  const dynamicParams = url?.match(/:\w+/g)?.map((p) => p.replace(':', ''));

  // 若url中存在动态参数 则处理url和params
  if (dynamicParams?.length && params) {
    // 获取params中的所有属性名
    const keys = Object.keys(params);

    // 用于存储未被定义的动态参数名
    let missingParam;

    // 验证 params 中是否包含所有需要的动态参数
    const isValid = dynamicParams?.every(
      // 当不包含动参时，将参数名记录在 missingParam 中并返回false
      (p) => keys.includes(p) || !(missingParam = p),
    );

    // 若缺少动态参数则不发送请求，并在控制台打印错误并返回对应Promise
    if (!isValid) {
      const errMsg = `url:${url}, 缺少参数${missingParam}`;
      return Promise.reject(errMsg);
    } else {
      // params包含所有动态参数时，处理url和params
      dynamicParams?.forEach((p) => {
        url = url?.replace(`:${p}`, params[p]);

        // 删除params中对应的属性 防止污染query
        delete params[p];
      });
    }
  }

  return service({
    ...config,
    url,
    params,
  });
};

export default request;
