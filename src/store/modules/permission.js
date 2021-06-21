import {
  constantRoutes
} from '@/router'
import Layout from '@/views/Layout'


const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, pers) {
      return new Promise(resolve => {
        const accessedRoutes = filterAsyncRouter(pers)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  try {
    console.log("filterAsyncRouter");
      const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
          if (route.component === 'Layout') { // Layout组件特殊处理
            
            route.component = Layout
          } else {
            const component = route.component
            route.component = resolve => {
              require(['@/components' + component + '.vue'], resolve)
            }
          }
        }
        if (route.children && route.children.length) {
          route.children = filterAsyncRouter( route.children)
        }
        return true
      })
      return accessedRouters
  } catch (e) {
    console.log(e)
  }
}







export default permission