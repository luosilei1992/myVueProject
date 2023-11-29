const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    port: 8085,
    open: true,
  },
  css: {
    extract: false
  }
};
module.exports = {
  
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 去除 debugger 和 console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  }
};
