<!--
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-20 08:01:43
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-14 17:10:29
 * @FilePath: \vue3-components\packages\components\tree\src\tree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div :class="bem.b()">
    <!-- 模板有自带的优化，如果是自定义比较强的采用 tsx 来写 -->
    <z-virtual-list :items="flattenTree">
      <template #default="{ node }">
        <z-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          :loading-keys="loadingkeysRef"
          :selectedkeys="selectKeysRef"
          :show-checkbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          :indeterminate="isIndetermiate(node)"
          @toggle="toggleExpanded"
          @select="handleSelect"
          @check="toggleCheck"
        >
        </z-tree-node>
      </template>
    </z-virtual-list>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, provide, useSlots, onMounted } from "vue";
import {
  Key,
  TreeNode,
  TreeOption,
  treeEmits,
  treeProps,
  treeInjectKey,
} from "./tree";
import { createNamespace } from "@vue-components/utils/create";
import ZTreeNode from "./treeNode.vue";
import ZVirtualList from "@vue-components/components/virtual-list";
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
        disabled: !!node.disabled,
        level: parent ? parent.level + 1 : 0,
        // 判断节点是否自带isleaf，自带了以自带的为准，没自带就判断是否有children，没有的话就默认为叶子节点
        isLeaf: node.isLeaf ?? children.length == 0,
        parentKey: parent?.key,
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
    console.log("watch", value);
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

provide(treeInjectKey, {
  slots: useSlots(),
});

const checkedKeysRef = ref(new Set(props.defaultCheckedKeys));

const isChecked = (node: TreeNode) => {
  return checkedKeysRef.value.has(node.key);
};
const isDisabled = (node: TreeNode) => {
  return !!node.disabled;
};
const indeterminateRefs = ref<Set<Key>>(new Set());

const isIndetermiate = (node: TreeNode) => {
  return indeterminateRefs.value.has(node.key);
};
// 自上而下的选中
const toggle = (node: TreeNode, checked: boolean) => {
  if (!node) return;
  const checkedKeys = checkedKeysRef.value;
  if (checked) {
    // 选中的时候去掉半选
    indeterminateRefs.value.delete(node.key);
  }
  //维护当前的key列表
  checkedKeys[checked ? "add" : "delete"](node.key);
  const children = node.children;
  if (children) {
    children.forEach((child) => {
      if (!child.disabled) {
        toggle(child, checked);
      }
    });
  }
};
const toggleCheck = (node: TreeNode, checked: boolean) => {
  toggle(node, checked);
  updateCheckedKeys(node);
};
const findNode = (key: Key) => {
  return flattenTree.value.find((node) => node.key === key);
};
const updateCheckedKeys = (node: TreeNode) => {
  //自下而上更新父节点
  if (node && node.parentKey) {
    const parentNode = findNode(node.parentKey);
    if (parentNode) {
      let allChecked = true; //默认儿子应该全选
      let hasChecked = false; //儿子有没有被选中
      const nodes = parentNode.children;
      for (const _node of nodes) {
        if (checkedKeysRef.value.has(_node.key)) {
          hasChecked = true; //子节点被选中了
        } else if (indeterminateRefs.value.has(_node.key)) {
          allChecked = false;
          hasChecked = true;
        } else {
          allChecked = false;
        }
      }
      if (allChecked) {
        checkedKeysRef.value.add(parentNode.key);
        indeterminateRefs.value.delete(parentNode.key);
      } else if (hasChecked) {
        checkedKeysRef.value.delete(parentNode.key);
        indeterminateRefs.value.add(parentNode.key);
      }
      updateCheckedKeys(parentNode);
    }
  }
};
onMounted(() => {
  checkedKeysRef.value.forEach((key) => {
    toggleCheck(findNode(key)!, true);
  });
});
console.log(flattenTree.value);
</script>
