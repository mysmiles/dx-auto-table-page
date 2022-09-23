import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  // 打包配置
  build: {
    lib: {
      entry:  'src/main.js', // 设置入口文件
      name: 'vite-lib', // 起个名字，安装、引入用
      fileName: (format) => `vite-lib.${format}.js` // 打包后的文件名
    },
    sourcemap: true, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'element-plus'
        }
      }
    }
  },
  plugins: [vue(), vueJsx({})],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@import "./package/index.less";',
      }
    }
  }
})
