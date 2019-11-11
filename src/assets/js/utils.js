/**
 * @工具文件, 编写所有公共方法函数
 */

/**
 * 字节转换
 * @param bytes 要转换的字节大小
 * @returns {string} 按1024计算返回相应单位值
 */
export function bytesToSize (bytes) {
  if (bytes === 0) return '0 B'
  let k = 1024
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  let sz = (bytes / Math.pow(k, i)).toFixed(2)
  return sz + ' ' + sizes[i]
}
