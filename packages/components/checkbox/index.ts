/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-12-10 07:53:10
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-10 08:22:55
 * @FilePath: \vue3-components\packages\components\virtual-list\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { withInstall } from "@vue-components/utils/with-install";
import _Checkbox from "./src/checkbox.vue";

const Checkbox = withInstall(_Checkbox);
export default Checkbox;

// 这里添加的类型，可以在模板中被解析
declare module "vue" {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    ZCheckbox: typeof Checkbox; // 注意这里的命名，需要和上面保持一致，组件要用驼峰
  }
}
