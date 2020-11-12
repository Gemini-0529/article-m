module.exports = {
    plugins: {
      autoprefixer: {//自动添加浏览器厂商声明前缀
                      //VueCLI已经在内部默认配置了autoprefixer
                      //写到package.json中
        // browsers: ['Android >= 4.0', 'iOS >= 8'],
      },
      'postcss-pxtorem': {//px转为rem
        rootValue: 37.5,//转换的根元素基准值(375*667)，根据设计稿设置
        propList: ['*'],//所有属性都转换
      },
    },
  };