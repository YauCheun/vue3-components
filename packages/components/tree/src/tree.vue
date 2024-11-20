<template>
  <div>
    tree
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { TreeNode, TreeOption, treeProps } from './tree';

defineOptions({ name: 'z-tree' })

const props = defineProps(treeProps)

const tree = ref<TreeNode[]>([])

function createTree(data:TreeOption[]):any {
  console.log(data)
}
watch(()=>props.data, (data:TreeOption[])=>{
  tree.value = createTree(data)
},{immediate:true})
</script>
