<template>
  <div>
    tree
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { TreeNode, TreeOption, treeProps } from './tree';

defineOptions({ name: 'z-tree' })

const props = defineProps(treeProps)

const tree = ref<TreeNode[]>([])

function createTreeOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string
    },
    getLabel(node: TreeOption) {
      return node[label] as string
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[]
    }
  }
}

const treeOptions = createTreeOptions(props.keyField, props.labelField, props.childrenField)
function createTree(data: TreeOption[]): TreeNode[] {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],//默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        // 判断节点是否自带isleaf，自带了以自带的为准，没自带就判断是否有children，没有的话就默认为叶子节点
        isLeaf: node.isLeaf ?? children.length == 0
      }
      if (children.length > 0) {
        //有孩子再去递归孩子，将其格式化成treeNode类型
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data)
  return result
}
watch(() => props.data, (data: TreeOption[]) => {
  tree.value = createTree(data)
  console.log(tree.value)
}, { immediate: true })



//将树节点拍平，点击实现展开操作

//需要展开的key
const expandedkeysSet = ref(new Set(props.defaultExpandedKeys))


const flattenTree = computed(() => {

  const expandedKeys = expandedkeysSet.value
  const flattenNodes: TreeNode[] = [] // 拍平后的结果

  const nodes = tree.value || []  // 被格式化后的节点

  const stack: TreeNode[] = [] //用于遍历树的栈

  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }
  // 深度遍历
  while (stack.length) {
    // 倒转后取取出栈顶元素
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children
      if (children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // 放到栈顶中，保证先遍历子节点
          stack.push(children[i])
        }
      }
    }

  }
  return flattenNodes
})

console.log(flattenTree.value)
</script>
