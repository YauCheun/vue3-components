/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-20 08:01:32
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-14 15:27:55
 * @FilePath: \vue3-components\packages\components\tree\src\tree.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from "vue";

export type Key = string | number;

export interface TreeNode extends Required<TreeOption> {
  level: number;
  rawNode: TreeOption;
  children: TreeNode[];
  isLeaf: boolean;
}

export interface TreeOption {
  label?: Key;
  key?: Key;
  children?: TreeOption[];
  isLeaf: boolean;
  disabled?: boolean;
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
    default: () => [],
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKey: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
} as const;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    default: () => ({} as TreeNode),
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
  },
  selectedkeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
};

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
};
export const treeEmits = {
  "update:selectedKey": (keys: Key[]) => keys,
};

export type TreeNodeEmits = typeof treeNodeEmits;
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;

export interface TreeContext {
  slots: SetupContext["slots"];
  // emits: SetupContext<typeof treeEmits>['emit'];
}
//此变量作为提供出去的属性上下文
export const treeInjectKey: InjectionKey<TreeContext> = Symbol("treeContext");
export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
};
