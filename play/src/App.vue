<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-07 08:23:39
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-10 07:50:08
 * @FilePath: \vue3-components\play\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<script setup lang="ts">
import { AccessibilitySharp } from "@vicons/ionicons5";
import { Key, TreeOption } from "@vue-components/components/tree/src/tree";
import { ref, watch } from "vue";

function buildTree(data: any[], parentKey = null): any {
  return data
    .filter((item) => item.parentKey === parentKey) // 筛选出当前层级的节点
    .map((item) => ({
      key: item.key,
      label: item.label,
      children: buildTree(data, item.key), // 递归构建子节点
    }));
}

// 示例数据
const data1 = [
  { key: 1, label: "Root 1", parentKey: null },
  { key: 2, label: "Child 1-1", parentKey: 1 },
  { key: 3, label: "Child 1-2", parentKey: 1 },
  { key: 4, label: "Root 2", parentKey: null },
  { key: 5, label: "Child 2-1", parentKey: 4 },
  { key: 6, label: "Grandchild 1-2-1", parentKey: 3 },
];
// 示例数据
const data2 = [
  { key: 1, label: "Root 1", isLeaf: false },
  { key: 2, label: "Root 2", isLeaf: false },
];
const data3  = creatData()
function creatData(level = 4, parentKey = ''): TreeOption[] {
  if (!level) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, index: number) => {
    const key = parentKey + level + index
    return {
      isLeaf: level === 1,
      label: creatLabel(level),
      key,
      children: creatData(level - 1, key)
    }
  })
}
function creatLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  return ''
}
const handleLoad = (node: TreeOption): Promise<TreeOption[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: Date.now(),
          label: node.label + "Child 1-1",
          isLeaf: false,
          disabled: true,
        },
      ]);
    }, 1000);
  });
};
// 构建树
const data = ref(buildTree(data1));

const selectValue = ref<Key[]>([]);
watch(
  () => selectValue,
  (val) => {
    console.log(111, val);
  }
);
</script>

<template>
  <z-icon :color="'yellow'" :size="20">
    <AccessibilitySharp></AccessibilitySharp>
  </z-icon>
  <z-tree
    v-model:selected-key="selectValue"
    :data="data3"
    label-field="label"
    key-field="key"
    children-field="children"
    :on-load="handleLoad"
    selectable
    multiple
  >
    <template #default="{ node }">
      {{ node.key+node.label }}
    </template>
  </z-tree>
  <!-- selectable 可选节点  multiple 可多选节点  select-kes 选中后的节点 -->
</template>

<style scoped></style>
