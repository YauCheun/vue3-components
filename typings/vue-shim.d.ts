/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-07 08:29:24
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-07 08:31:05
 * @FilePath: \vue3-components\typings\vue-shim.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare module '*vue' {
  import type {DefineComponent} from 'vue'
  const componet: DefineComponent<{},{},any>
  export default componet
}