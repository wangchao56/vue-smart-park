import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()
    , AutoImport({
      resolvers: [
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
        ElementPlusResolver()]
    }),
  Components({
    resolvers: [
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep'],
      }),
      ElementPlusResolver()

    ],
  }),
  Icons({
    autoInstall: true,
  }),

  ],
  //配置别名
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
