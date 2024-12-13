<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-12-11 08:12:39
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-13 08:07:43
 * @FilePath: \vue3-components\packages\components\checkbox\src\checkbox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <label :class="bem.b()">
    <span> <input ref="inputRef" v-model="model" type="checkbox" :disabled="disabled" :value="label" @change="handleChange"/></span>

    <span v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default"> {{ label }} </template>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { createNamespace } from "@vue-components/utils/create";
import { checkboxEmits, checkboxProps } from "./checkbox";
import { computed, onMounted, ref, watch } from "vue";
const bem = createNamespace("checkbox");
const props = defineProps(checkboxProps);
const emit = defineEmits(checkboxEmits);
defineOptions({ name: "z-checkbox" });
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val: string | boolean | number) {
    emit("update:modelValue", val);
  },
});
const inputRef = ref<HTMLInputElement>();
function handleChange(e: Event) {
  emit("change", (e.target as HTMLInputElement).checked);
}
function indeterminate(val: boolean) {
  inputRef.value!.indeterminate = val;
}
watch(() => props.indeterminate, indeterminate);
onMounted(() => {
  indeterminate(props.indeterminate);
});
</script>
