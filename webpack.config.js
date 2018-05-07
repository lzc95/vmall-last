const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
  entry:  {
    index:  path.resolve(__dirname, './src/main.js'),
    vendor: ['axios']   
  },
  output: {
      filename: "bundle[chunkhash:8].js",
      path: __dirname + '/dist', //输出文件路径
    //   publicPath:'/'  //指定静态资源 (图片等) 的发布地址
  },
  devtool:false,
  externals: {
       	'react':'React',
       	'react-dom':'ReactDOM',
	'react-router-dom':'ReactRouterDOM'
  },
  module:{
    loaders:[
        {
            test:/\.(js|jsx)$/,
            exclude:/node_modules/,
            loaders:"babel-loader",
	    options: {
	        presets: ['es2015','react'],
	        plugins:[
		    ['import', [{libraryName: 'antd-mobile', style:'css' },
		    {libraryName:'antd',style:'css'}]],
		    ['transform-runtime', 'lodash'],
		 ]
	    },
        },
        {
            test:/\.css$/,
            loader:'style-loader!css-loader'
	  
	 
        },
	{
            test:/\.less$/,
	    loader:'style-loader!css-loader!less-loader'
	   
	},
        {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'url-loader?name=assets/[hash].[ext]'

        },
        
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
	    removeComments: true,               //去注释
            collapseWhitespace: true,           //压缩空格
	    removeAttributeQuotes: true     //去除属性引用  
       }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.optimize.UglifyJsPlugin({
         mangle: {
             except: ['exports', 'require', 'module', '_']
         },
         compress: {
             warnings: false
         },
         output: {
            comments: false,
         }
     })
  ],

  devServer: {
   disableHostCheck:true,
   port:9099
 }

};

module.exports = config;
