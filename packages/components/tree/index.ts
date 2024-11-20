import { withInstall } from "@vue-components/utils/with-install";
import _Tree from "./src/tree.vue";

const Tree = withInstall(_Tree);
export default Tree;

// 这里添加的类型，可以在模板中被解析
declare module "vue" {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    ZTree: typeof Tree; // 注意这里的命名，需要和上面保持一致，组件要用驼峰
  }
}
