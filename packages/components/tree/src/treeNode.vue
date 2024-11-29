<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-22 08:19:13
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-29 08:15:53
 * @FilePath: \vue3-components\packages\components\tree\src\treeNode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="bem.b()">
    <div :class="bem.e('content')" :style="{ paddingLeft: `${node!.level * 16}px` }">
      <!-- 展开并且不为叶子节点 展开图标 -->
      <span :class="[bem.e('expand-icon'), { expanded: expanded && !node?.isLeaf },bem.is('leaf',node.isLeaf)]">
        <z-icon size="20" @click="$emit('toggle', node)">
          <Switcher></Switcher>
        </z-icon>
      </span>
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { createNamespace } from '@vue-components/utils/create';
import { treeNodeEmits, treeNodeProps } from './tree'
import Switcher from './icon/Switcher';
const bem = createNamespace('tree-node')
const props = defineProps(treeNodeProps)
const emits = defineEmits(treeNodeEmits)
</script>
