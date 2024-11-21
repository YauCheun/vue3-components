<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-07 08:23:39
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-20 08:17:38
 * @FilePath: \vue3-components\play\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<script setup lang="ts">
import { AccessibilitySharp } from "@vicons/ionicons5";
import { ref } from "vue";

function buildTree(data: any[], parentKey = null): any {
  return data
    .filter(item => item.parentKey === parentKey) // 筛选出当前层级的节点
    .map(item => ({
      key: item.key,
      label: item.label,
      children: buildTree(data, item.key) // 递归构建子节点
    }));
}

// 示例数据
const data1 = [
  { key: 1, label: 'Root 1', parentKey: null },
  { key: 2, label: 'Child 1-1', parentKey: 1 },
  { key: 3, label: 'Child 1-2', parentKey: 1 },
  { key: 4, label: 'Root 2', parentKey: null },
  { key: 5, label: 'Child 2-1', parentKey: 4 },
  { key: 6, label: 'Grandchild 1-2-1', parentKey: 3 }
];

// 构建树
const data = ref(buildTree(data1));
</script>

<template>
  <z-icon :color="'yellow'" :size="20">
    <AccessibilitySharp></AccessibilitySharp>
  </z-icon>
  <z-tree :data="data" :default-expanded-keys="[2]" label-field="label" key-field="key" children-field="children"></z-tree>
</template>

<style scoped></style>
