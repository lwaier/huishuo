<template>
  <div>
        <el-row>
            <el-col :span="5">
                <div class="title">
                     小白的面试test
                </div>
            </el-col>
            <el-col :span="19"><div>
                <el-menu :default-active="activeMenu" class="el-menu-demo" mode="horizontal">
                    <el-menu-item v-for="item in routes" :key="item.path" :index="item.path" v-show="!item.hidden" @click="handleSelect(item)">{{!item.hidden&&item.meta.title}}</el-menu-item>
                </el-menu>   
            </div></el-col>
        </el-row>
        
  </div>
</template>

<script>

import {mapMutations} from 'vuex'


export default {
    name:'NavbarTop',
    data() {
        return{

        }
    },
    computed:{
        activeMenu() {
            let path = this.$route.path
            path =  '/'+path.split('/')[1]
            if(path == '/dashboard'||path == '/dashboardnew'){
            //单独兼容根目录重定向
                path = '/'
            }

            return '/'+path.split('/')[1]
            
        }, //当前路由选中的菜单
        routes() {
            return this.$router.options.routes.map(item=>{
                let obj = {}
                obj.path = item.path; //该菜单点击应该跳转的位置
                obj.hidden = item.hidden; // 该菜单是否隐藏
                obj.children = item.children?item.children:''; //是否有子路由
                if(item.meta){
                    obj.meta=item.meta; //当前路由的信息
                }else if(!item.hidden){
                    obj.meta=item.children[0].meta; //当前路由的信息(兼容没有meta的路由)
                }
                
                return obj
            })
        }, //当前路由顶级菜单
    },
    mounted(){
        console.log(this.$router,'当前路由router');
    },
    methods:{
        ...mapMutations([
            'SET_MENULISTLEFT',
            'SET_TOP_ROUTER'
        ]),
        handleSelect(item){
            console.log(item,'点击的菜单');
            if(!item.children){ //当没有子路由时 直接跳转
                this.$router.push({
                    path:item.path, 
                })
            }else{
                //当有子路由时,切换左侧菜单,
                this.SET_MENULISTLEFT({list:item.children}); //存入下级菜单
                this.SET_TOP_ROUTER({topPath:item.path}); //存入顶级path
            }
        },
    }


}
</script>

<style lang="scss" scoped>
    .title{
        text-align: left;
        text-indent: 2em;
        line-height: 61px;
    }
</style>
