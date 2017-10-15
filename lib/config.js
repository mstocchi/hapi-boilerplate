'use strict'

const config = require('config')

function setup () {
  /*
        File Load order - see https://github.com/lorenwest/node-config/wiki/Configuration-Files
        default.EXT
        default-{instance}.EXT
        {deployment}.EXT
        {deployment}-{instance}.EXT
        {short_hostname}.EXT
        {short_hostname}-{instance}.EXT
        {short_hostname}-{deployment}.EXT
        {short_hostname}-{deployment}-{instance}.EXT
        {full_hostname}.EXT
        {full_hostname}-{instance}.EXT
        {full_hostname}-{deployment}.EXT
        {full_hostname}-{deployment}-{instance}.EXT
        local.EXT
        local-{instance}.EXT
        local-{deployment}.EXT
        local-{deployment}-{instance}.EXT
        (Finally, custom environment variables can override all files)
    */

  console.log('Load configuration')
}

const getConfigParameter = function (parameter) {
  return config.get(parameter)
}

module.exports = {
  setup: setup,
  get: getConfigParameter
}
