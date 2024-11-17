<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-15 07:59:30
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-17 12:59:43
 * @FilePath: \vue3-components\packages\components\icon\src\icon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE

-->

<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { createNamespace } from '@vue-components/utils/create'
import { iconProps } from './icon';
import { computed } from 'vue';
defineOptions({
  name: 'z-icon'
})
const bem = createNamespace('icon')
const props = defineProps(iconProps)

// 计算属性 计算样式
const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    ...(props.color ? { color: props.color } : {}),
    ...(props.size ? { "font-size": props.size + "px" } : {}),
  }
})
</script>