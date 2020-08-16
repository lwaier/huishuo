/*
 * @Date: 2020-08-16 08:57:05
 * @LastEditTime: 2020-08-16 09:20:13
 * @LastEditors: lixiaobai
 * @Description: 
 */
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  menuListLeft:[], //侧边导航菜单
  topPath:'', //顶级路径
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_MENULISTLEFT(state, {list}){
    state.menuListLeft = list
    console.log(state.menuListLeft,'左侧导航菜单');
  },
  SET_TOP_ROUTER(state, {topPath}){
    state.topPath = topPath
  }
}

const actions = {
  'app/toggleSideBar'({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  'app/closeSideBar'({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  'app/toggleDevice'({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  // namespaced: true, 不去掉也可以 在提交mutation或者actions的时候需要加上app模块名
  state,
  mutations,
  actions
}
