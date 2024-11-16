/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-15 07:54:06
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-16 10:44:11
 * @FilePath: \vue3-components\packages\components\icon\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-15 07:54:06
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-15 08:26:50
 * @FilePath: \vue3-components\packages\components\icon\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { withInstall } from '@vue-components/utils/with-install'
import _Icon from './src/icon.vue'


const Icon = withInstall(_Icon)
export default Icon // 可以通过app.use(Icon) 全局注册，也可以通过import单独使用
export * from './src/icon'

// 这里添加的类型，可以在模板中被解析
declare module 'vue' {
  export interface GlobalComponents { // 我们的接口可以自动合并
    ZIcon: typeof Icon  // 注意这里的命名，需要和上面保持一致，组件要用驼峰
  }
}