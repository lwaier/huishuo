<template>
<div>
    <XiaobaiTop class="nav_top"></XiaobaiTop>
    <div :class="classObj" class="app-wrapper">
      <div class="layout_bottom">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <!-- 左侧菜单组件 -->
        <sidebar class="sidebar-container" /> 
        <!-- 右侧区域 -->
        <div class="main-container">
          <!-- 头部nav条 -->
          <div :class="{'fixed-header':fixedHeader}">
            <navbar />
          </div>
          <!-- 展示内容区 -->
          <app-main />
        </div>
      </div>
    </div>
</div>
  
</template>



<script>
// 注： 该框架整个layout输出页用了响应式布局 以及大屏下的标准两栏布局
// 所有路由都渲染layout组件 所有路由的子路由都在layout组件的app-main内容展示组件中渲染 实现了后台管理系统基本展示框架

import { Navbar, Sidebar, AppMain } from './components'
import XiaobaiTop from './components/XiaobaiTop'
import ResizeMixin from './mixin/ResizeHandler'
import {mapMutations} from 'vuex'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    XiaobaiTop
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_MENULISTLEFT',
      'SET_TOP_ROUTER'
    ]),
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  created(){
    console.log(this.$router,'');
    let path = this.$route.path
    let list = [];
    path =  '/'+path.split('/')[1]
    if(path == '/dashboard'||path == '/dashboardnew'){
      //单独兼容根目录重定向
      path = '/'
    }
    this.$router.options.routes.forEach(item=>{
      if(item.path==path){
        list = item.children

      }
    })
    this.SET_TOP_ROUTER({topPath:path}); //存入顶级path
    this.SET_MENULISTLEFT({list}); //存入下级菜单
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  
  .nav_top{
    height: 61px;
  }
  .sidebar-container{
    position: fixed;
    top: 61px !important;
  }
 


</style>
