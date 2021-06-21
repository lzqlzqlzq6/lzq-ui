import { Loading } from 'element-ui'

// loading实例
let loadingInstance = null
// 个数
let loadingCount = 0

// 关闭loading框
export const finishLoading = () => {
  loadingCount--
  if (loadingInstance && loadingCount === 0) {
    loadingInstance.close()
    loadingInstance = null
  }
}

// 开启loading框
export const startLoading = ({
  text = '数据加载中...',
  fullscreen = true,
  spinner = 'el-icon-loading',
  needLoading = true
} = {}) => {
  loadingCount++
  // 上一个请求的loading还存在，就不需要继续生成loading服务
  if (needLoading && !loadingInstance) {
    loadingInstance = Loading.service({
      fullscreen,
      text,
      spinner,
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
}