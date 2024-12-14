/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-12-11 08:12:45
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-13 08:10:56
 * @FilePath: \vue3-components\packages\components\checkbox\src\checkbox.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {  ExtractPropTypes, PropType } from "vue";

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,

  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: ""
  }
} as const

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>
export const checkboxEmits = {
  'update:modelValue': (value: string | boolean | number)=> typeof value !== 'boolean',
  'change': (value: boolean) => typeof value !== 'boolean',
}

export type CheckboxEmits = typeof checkboxEmits
