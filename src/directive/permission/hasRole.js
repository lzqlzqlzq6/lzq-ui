 /**
 * 角色权限处理
 * Copyright (c) 2019 ruoyi
 */
 
  import store from '@/store'

  export default {
    inserted(el, binding) {
      const { value } = binding

      if (value && value instanceof Array && value.length > 0) {
        const roles = store.getters.roles
        const permissionRoles = value
    
        const hasPermission = roles.some(role => {
          return permissionRoles.includes(role)
        })
  
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`请设置角色权限标签值"`)
      }
    }
  }