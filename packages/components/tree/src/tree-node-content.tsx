import { defineComponent, inject } from "vue";
import { TreeContext, treeInjectKey, treeNodeContentProps } from "./tree";

export default defineComponent({
  name: "ZTreeNodeContent",
  props: treeNodeContentProps,
  setup(props, { emit, slots }) {
    const treeContext = inject(treeInjectKey) as TreeContext;
    return () => {
      return treeContext?.slots?.default ? (
        treeContext?.slots?.default({node:props.node})
      ) : props.node?.label
    };
  },
});
