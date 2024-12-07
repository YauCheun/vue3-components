<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-20 08:01:43
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-07 09:53:14
 * @FilePath: \vue3-components\packages\components\tree\src\tree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div :class="bem.b()">
    <!-- 模板有自带的优化，如果是自定义比较强的采用 tsx 来写 -->
    <z-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :loading-keys="loadingkeysRef"
      :selectedkeys="selectKeysRef"
      @toggle="toggleExpanded"
      @select="handleSelect"
    ></z-tree-node>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { Key, TreeNode, TreeOption, treeEmits, treeProps } from "./tree";
import { createNamespace } from "@vue-components/utils/create";
import ZTreeNode from "./treeNode.vue";
const bem = createNamespace("tree");

defineOptions({ name: "z-tree" });

const props = defineProps(treeProps);

const tree = ref<TreeNode[]>([]);
// 1.用来获取对应的字段
function createTreeOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string;
    },
    getLabel(node: TreeOption) {
      return node[label] as string;
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[];
    },
  };
}

const treeOptions = createTreeOptions(
  props.keyField,
  props.labelField,
  props.childrenField
);
// 2.格式化 数据
function createTree(
  data: TreeOption[],
  parent: TreeNode | null = null
): TreeNode[] {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map((node) => {
      const children = treeOptions.getChildren(node) || [];
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], //默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        // 判断节点是否自带isleaf，自带了以自带的为准，没自带就判断是否有children，没有的话就默认为叶子节点
        isLeaf: node.isLeaf ?? children.length == 0,
      };
      if (children.length > 0) {
        //有孩子再去递归孩子，将其格式化成treeNode类型
        treeNode.children = traversal(children, treeNode);
      }
      return treeNode;
    });
  }
  const result: TreeNode[] = traversal(data, parent);
  return result;
}
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data);
    console.log(tree.value);
  },
  { immediate: true }
);

//将树节点拍平，点击实现展开操作

//需要展开的key
const expandedkeysSet = ref(new Set(props.defaultExpandedKeys));

// 3.将树拍平
const flattenTree = computed(() => {
  const expandedKeys = expandedkeysSet.value;
  const flattenNodes: TreeNode[] = []; // 拍平后的结果

  const nodes = tree.value || []; // 被格式化后的节点

  const stack: TreeNode[] = []; //用于遍历树的栈

  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i]);
  }
  // 深度遍历
  while (stack.length) {
    // 倒转后取取出栈顶元素
    const node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node);
    if (expandedKeys.has(node.key)) {
      const children = node.children;
      if (children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // 放到栈顶中，保证先遍历子节点
          stack.push(children[i]);
        }
      }
    }
  }
  return flattenNodes;
});
//当前正在加载的节点key
const loadingkeysRef = ref(new Set() as Set<Key>);
function isExpanded(node: TreeNode) {
  return expandedkeysSet.value.has(node.key);
}
function triggerLoading(node: TreeNode) {
  console.log("triggerLoading", node);
  if (!node.children.length && !node.isLeaf) {
    const loadingKeys = loadingkeysRef.value;
    //没有这个节点就加载这个节点
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);
      if (props.onLoad) {
        props.onLoad(node).then((children: TreeOption[]) => {
          //修改原来的节点
          node.rawNode.children = children;
          // 更新自定义节点
          node.children = createTree(children, node);
          loadingKeys.delete(node.key);
        });
      }
    }
  }
}
//展开
function expand(node: TreeNode) {
  expandedkeysSet.value.add(node.key);
  triggerLoading(node);
}
//收起
function collapse(node: TreeNode) {
  expandedkeysSet.value.delete(node.key);
}
//4.用户展开收起
function toggleExpanded(node: TreeNode) {
  if (node.isLeaf) return;
  const expandedKeys = expandedkeysSet.value;
  if (expandedKeys.has(node.key)) {
    collapse(node);
  } else {
    expand(node);
  }
}

//5.实现选中节点
const emits = defineEmits(treeEmits);

const selectKeysRef = ref<Key[]>([]);
watch(
  () => props.selectedKey,
  (value: Key[]) => {
    selectKeysRef.value = value;
    console.log("watch", value)
  },
  { immediate: true }
);
//处理选中的节点
function handleSelect(node: TreeNode) {
  console.log("handleSelect", node);
  let selectKeys = Array.from(selectKeysRef.value);
  if (!props.selectable) return; // 不呢选直接返回

  if (props.multiple) {
    const index = selectKeys.findIndex((key) => key === node.key);
    if (index === -1) {
      selectKeys.push(node.key);
    } else {
      selectKeys.splice(index, 1);
    }
  } else {
    if (selectKeys.includes(node.key)) {
      selectKeys = [];
    } else {
      selectKeys = [node.key];
    }
  }
  emits("update:selectedKey", selectKeys);
}
console.log(flattenTree.value);
</script>
