/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-07 08:23:39
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-28 07:38:04
 * @FilePath: \vue3-components\play\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),jsx()],
})
