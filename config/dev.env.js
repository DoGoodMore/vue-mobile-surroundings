'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://169.56.12.110:9399"',//测试
   //BASE_API: '"http://169.56.12.76:9999"',//生产
})
