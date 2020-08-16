module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ], //预设
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    } //开发环境插件 -提升热更新速度
  }
}
