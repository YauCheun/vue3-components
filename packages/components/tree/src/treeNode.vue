<template>
  <div :class="bem.b()">
    <div :class="bem.e('content')" :style="{ paddingLeft: `${node!.level * 16}px` }">
      <!-- 展开并且不为叶子节点 展开图标 -->
      <span :class="[bem.e('expand-icon'), { expanded: expanded && !node?.isLeaf }]">
        <z-icon size="16" color="pink">
          <Switcher></Switcher>
        </z-icon>
      </span>
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { createNamespace } from '@vue-components/utils/create';
import { treeNodeProps } from './tree'
import Switcher from './icon/Switcher';
const bem = createNamespace('tree-node')
const props = defineProps(treeNodeProps)

</script>
