// 导入封装好的网络请求类工具
import http from './http';

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);
export const test = () => http.get('/lzqblog-blog/lzqblog/blog/test',{ name: 'lzq' });