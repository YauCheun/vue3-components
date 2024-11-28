/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-20 08:01:32
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-28 08:16:29
 * @FilePath: \vue3-components\packages\components\tree\src\tree.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractPropTypes, PropType } from "vue";

type Key = string | number;


export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[]
  isLeaf: boolean;
}

export interface TreeOption {
  label?: Key;
  key?: Key;
  children?: TreeOption[];
  isLeaf: boolean;
  [key: string]: unknown;
}
export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: [],
  },
  labelField: {
    type: String,
    default: "label",
  },
  keyField: {
    type: String,
    default: "key",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
} as const;

export const treeNodeProps = {
  node:{
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded:{
    type: Boolean,
    required: true
  }
}
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
