// 导入封装好的网络请求类工具
import http from './http';

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);
export const login = (formName) => http.post('/lzqblog-auth/auth/login', {
    username: formName.username,
    password: formName.password,
    uuid: formName.uuid,
    verification: formName.verification
});

export const getInfo = () => http.get('/lzqblog-auth/auth/getInfo');
export const logout = () => http.get('/lzqblog-auth/auth/logout');

