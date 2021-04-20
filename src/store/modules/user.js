import {
    login,
    logout,
    getInfo
} from '@/request/api'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/cookie'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        permissions: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },

    actions: {
        // 登录
        Login({
            commit
        }, userInfo) {
            const username = userInfo.username
            const password = userInfo.password
            const verification = userInfo.verification
            const uuid = userInfo.uuid
            const data = {
                username,
                password,
                uuid,
                verification
            }
            return new Promise((resolve, reject) => {
                login(data).then((res) => {
                    console.log(res);
                    if (res.success) {
                        setToken(res.data.token);
                        commit('SET_TOKEN', res.data.token)
                        resolve()
                    } else {
                        console.log("error");
                    }
                }).catch(error => {
                    reject(error)
                });
            })
        },

        // 获取用户信息
        GetInfo({
            commit,
        }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    const user = res.user
                    const avatar = user.avatar == "" ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' : user.avatar;
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles)
                        commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.userName)
                    commit('SET_AVATAR', avatar)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({
            commit
        }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user