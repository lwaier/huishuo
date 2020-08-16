<template>
<!-- 左侧菜单导航组件 -->
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 样式组件 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 菜单组件 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 自定义递归组件 -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
//此页面比较重要的点有
// 1：计算属性 activeMenu -- 它可以监听路由的变化得到相应要展开的子菜单 el-menu-item或el-submenu 其中路由的meta.activeMenu可以自定义要展开的子菜单
// 2: 自定义组件 sidebar-item --它是vue-admin-template开发人员自定义的组件 目的是为了配合路由的树结构 树结构的渲染需要递归组件 使用name属性即可（注意出口，避免溢出）
// 总结 此组件本质上是为了渲染router数据结构 并且实现相应的跳转

import { mapGetters,mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    ...mapState({
      'routes':state=>state.app.menuListLeft,
      'topPath':state=>state.app.topPath,
    }),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu.split(this.topPath)[1]
      }
      console.log(this.topPath,'得到的');
      let pathNew = "";
      if(this.topPath=='/'){
        pathNew ='/'+path.split(this.topPath)[1]
      }else{
        pathNew =path.split(this.topPath)[1]
      }
      return pathNew
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
