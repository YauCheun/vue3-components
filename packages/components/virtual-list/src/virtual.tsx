/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-12-10 07:53:42
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-11 08:06:08
 * @FilePath: \vue3-components\packages\components\virtual-list\src\virtual.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createNamespace } from "@vue-components/utils/create";
import { ReactNode } from "react";
import { transform } from "typescript";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

export default defineComponent({
  name: "ZVirtual",
  props: {
    size: {
      type: Number,
      default: 30,
    },
    remain: {
      type: Number,
      default: 8,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const bem = createNamespace("vl");
    const wrapperRef = ref<HTMLElement | undefined>();
    const barRef = ref<HTMLElement>();
    const state = reactive({
      // 计算显示的区域
      start: 0,
      end: props.remain,
    });

    const prev = computed(()=>{
      return Math.min(state.start,props.remain)
    })
    const next = computed(()=>{
      return Math.min(props.remain,props.items.length-state.end)
    })

    //展示上下数据，保证滚动不白屏
    const visibleData = computed(() => {
      return props.items.slice(state.start-prev.value, state.end+next.value);
    });

    const offset = ref(0);
    const handleScroll = () => {
      //根据当前滚动的距离，来算滚动了多少数据
      const scrollTop = wrapperRef.value!.scrollTop;
      state.start = Math.floor(scrollTop / props.size);
      state.end = state.start + props.remain;
      offset.value = state.start * props.size - props.size * prev.value;
    };
    const initWrapper = () => {
      wrapperRef.value!.style.height = props.remain * props.size + "px";
      barRef.value!.style.height = props.items.length * props.size + "px";
    };
    watch(
      () => props.items,
      initWrapper
    );
    onMounted(() => {
      initWrapper()
    });
    return () => {
      return (
        <div
          className={bem.b()}
          ref={wrapperRef as any}
          onScroll={handleScroll}
        >
          <div className={bem.e("scroll-bar")} ref={barRef as any}></div>
          <div
            className={bem.e("scroll-list")}
            style={{ transform: `translateY(${offset.value}px)` }}
          >
            {visibleData.value.map(
              (node) => slots?.default?.({ node }) as ReactNode
            )}
          </div>
        </div>
      );
    };
  },
});
