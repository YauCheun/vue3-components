/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-17 15:13:21
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-11-17 15:21:20
 * @FilePath: \vue3-components\docs\.vitepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEZ-
 */
// .vitepress/config.js
module.exports = {
  title: "Z-UI", // 网站标题
  description: "zhang-ui", // 网站描述

  // 基本路径
  base: "/", // 生产环境构建的基本路径

  // 主题配置
  themeConfig: {
    docsDir: "docs", // 文档目录
    editLinks: true,
    editLinkText: "编辑此网站",
    // 导航栏配置
    nav: [
      { text: "指南", link: "/guide/installation", acticeMatch: "/guide/" },
      { text: "组件", link: "/component/icon", acticeMatch: "/component/" },
    ],

    // 侧边栏配置
    sidebar: {
      // 自动生成侧边栏
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "安装", link: "/guide/installation" },
            { text: "快速开始", link: "/guide/quieStart" },
          ],
        },
      ],

      // 其他页面的侧边栏
      "/component/": [
        {
          text: "基础组件",
          items: [{ text: "Icon", link: "/component/icon" }],
        },
      ],
    },

    // 站点 footer
    footer: {
      message: "MIT License | Copyright © 2024",
      copyright: "Vue 项目文档",
    },
  },

  // 配置 markdown 插件
  markdown: {
    lineNumbers: true, // 显示代码行号
  },

  // 构建配置
  build: {
    outDir: "dist", // 输出目录
  },

  // 其他自定义配置
  plugins: [
    // 添加 VitePress 插件，如果需要的话
  ],
};
