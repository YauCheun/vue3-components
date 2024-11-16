/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-07 08:23:39
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-16 11:50:32
 * @FilePath: \vue3-components\play\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from '@vue-components/components/icon'
import '@vue-components/theme-chalk/src/index.scss'
const plugins = [Icon]
const app =createApp(App)
plugins.forEach(plugin=>app.use(plugin))
app.mount('#app')
