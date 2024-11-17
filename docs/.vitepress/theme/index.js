/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-17 15:42:15
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-17 15:45:34
 * @FilePath: \vue3-components\docs\.vitepress\theme\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import DefaultTheme from "vitepress/theme";

import ZIcon from "@vue-components/components/icon";
import '@vue-components/theme-chalk/src/index.scss'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ZIcon); //在vitepress中全局注册组件
  },
};
