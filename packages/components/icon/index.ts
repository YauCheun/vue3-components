/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-15 07:54:06
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-15 08:26:50
 * @FilePath: \vue3-components\packages\components\icon\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import _Icon from './src/icon.vue'

import {Plugin} from 'vue'

export type  SFCWithInstall<T> = T & Plugin   // 约束插件的泛型类型
export function withInstall<T>(comp:T) {
  (comp as SFCWithInstall<T>).install = function(app:any){
    const {name} = comp as unknown as {name:string}
    app.component(name, comp) //将组件 全局注册
  }
  return comp
}

const Icon = withInstall(_Icon)
export default Icon // 可以通过app.use(Icon) 全局注册，也可以通过import单独使用
export * from './src/icon'