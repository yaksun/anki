const path = require("path");
//const webpack = require("webpack")

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false, //关闭生成.map编译调试文件 
  //路径前缀
  lintOnSave: true,
  devServer: {
    port: 1888,
    proxy: {
      "/api": {
       
         target: "http://192.168.1.211:7000", // 
       
        //远程演示服务地址,可用于直接启动项目
        ws: true,
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
      }
      }
    
    },
  },
  chainWebpack(config) {
    const svgRule = config.module.rule("svg"); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/assets/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: "vue-loader",
        },
        {
          loader: require.resolve("./markdown-loader"),
        },
      ],
    },
    );
  },
};
