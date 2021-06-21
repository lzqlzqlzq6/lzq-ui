// 导入封装好的网络请求类工具
import http from './http';

// 封装各种接口请求
// export const 接口名 = () => Network.get('/路由',参数对象);
/*获取博客 */
export const getAllBlog = (from, size,typeId,querySeach) => http.get('/lzqblog-blog/blog/getAllBlog', {
    from,
    size,
    typeId,
    querySeach
});
/*登录 */
export const login = (formName) => http.post('/lzqblog-auth/auth/login', {
    username: formName.username,
    password: formName.password,
    uuid: formName.uuid,
    verification: formName.verification
});
/*发布博客 */
export const pushBlog = (title, description, content, typeId, username, comment) => http.post('/lzqblog-blog/blog/pushBlog', {
    title,
    description,
    content,
    typeId,
    username,
    comment
});
/*获取用户信息 */
export const getInfo = () => http.get('/lzqblog-auth/auth/getInfo');
/*获取博客分类 */
export const getType = () => http.get('/lzqblog-blog/type/getType');
/*退出登录 */
export const logout = () => http.get('/lzqblog-auth/auth/logout');
/*获取点击的博客信息 */
export const getBlog = (id,username) => http.get('/lzqblog-blog/blog/getBlog',{id,username});


export const puttest = (test) => http.put('/lzqblog-auth/auth/puttest', {
    test: test
});
export const deletest = (id) => http.delete('/lzqblog-auth/auth/deletest', {
    'id': id
});

// 图片上传
export const uploadImg = (params) => http.upload('/lzqblog-blog/blog/uploadImg', params);