import router from '@/router'
import store from '@/store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/cookie' // get token from cookie

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/', '/blog'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/') {
      // if is logged in, redirect to the home page
      if (!store.getters.name) {
        await store.dispatch('GetInfo')
      }
      next()
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.addRoutes && store.getters.addRoutes.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('GetInfo')
          const accessRoutes = await store.dispatch('GenerateRoutes', [...store.getters.permissions])
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          next({
            ...to,
            replace: true
          })
        } catch (error) {
          await store.dispatch('FedLogOut')
          Message.error(error || 'Has Error')
          next(`/?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/?redirect=${to.path}`)
      Message.warning('请先登录之后重试')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})