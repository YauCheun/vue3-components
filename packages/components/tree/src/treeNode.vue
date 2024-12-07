<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-22 08:19:13
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-07 10:26:31
 * @FilePath: \vue3-components\packages\components\tree\src\treeNode.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
    <div
      :class="[
        bem.e('content'),
        bem.is('selected', isSelected),
        bem.is('disabled', node.disabled),
      ]"
      :style="{ paddingLeft: `${node!.level * 16}px` }"
    >
      <!-- 展开并且不为叶子节点 展开图标 -->
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node?.isLeaf },
          bem.is('leaf', node.isLeaf),
        ]"
      >
        <z-icon size="20" @click="$emit('toggle', node)">
          <Loading v-if="isLoading"></Loading>
          <Switcher v-else></Switcher>
        </z-icon>
      </span>
      <span @click="handleSelected">
        <ZTreeContent :node="node"></ZTreeContent>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@vue-components/utils/create";
import { treeNodeEmits, treeNodeProps } from "./tree";
import Switcher from "./icon/Switcher";
import Loading from "./icon/Loading";
import { computed } from "vue";
import ZTreeContent from './tree-node-content'
const bem = createNamespace("tree-node");
const props = defineProps(treeNodeProps);
const emits = defineEmits(treeNodeEmits);
const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node.key);
});

const isSelected = computed(() => {
  console.log("isSelected", props.selectedkeys);
  return props.selectedkeys?.includes(props.node.key);
});
const handleSelected = () => {
  if (props.node.disabled) return;
  emits("select", props.node);
};
</script>
