/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-12-14 17:15:08
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-21 11:26:05
 * @FilePath: \vue3-components\packages\components\tree\src\model\useTree.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Ref, SetupContext, onMounted, ref, watch } from "vue";
import { Key, TreeNode, TreeOption, TreeProps } from "../tree";
import { TreeEmits } from "../tree";
export const useTreeToggleExpand = (
  props: TreeProps,
  loadingkeysRef: Ref<Set<Key>>,
  createTree: (data: TreeOption[], parent: TreeNode | null) => TreeNode[]
) => {
  //需要展开的key
  const expandedkeysSet = ref(new Set(props.defaultExpandedKeys));
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
  return {
    expandedkeysSet,
    toggleExpanded,
    isExpanded,
  };
};
export const useTreeSelect = (
  props: TreeProps,
  emits: SetupContext<TreeEmits>["emit"]
) => {
  const selectKeysRef = ref<Key[]>([]);
  watch(
    () => props.selectedKey,
    (value: Key[] | undefined) => {
      if (value) {
        selectKeysRef.value = value;
        console.log("watch", value);
      }
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
  return {
    selectKeysRef,
    handleSelect,
  };
};
export const useTreeCheck = (
  props: TreeProps,
  flattenTree: Ref<TreeNode[]>
) => {
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
  return {
    checkedKeysRef,
    isChecked,
    isDisabled,
    isIndetermiate,
    toggleCheck,
  };
};
