/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-15 07:54:33
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-15 07:59:53
 * @FilePath: \vue3-components\packages\components\icon\src\icon.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 组件相关的组件属性和ts类型
import {ExtractPropTypes, PropType} from 'vue'
export const iconProps = {
  size: {
    type: [Number, String] as PropType<string | number>,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>