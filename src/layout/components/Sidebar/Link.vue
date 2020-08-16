<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
import {mapState} from 'vuex'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      topPath:state=>state.app.topPath
    }),
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      let toNew = ""
      if(this.topPath=='/'){
        toNew = to; //兼容根级路由
      }else{
        toNew = this.topPath+to; //兼容多级路由
      }
      
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: toNew
      }
    }
  }
}
</script>
