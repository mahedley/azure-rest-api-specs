// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License in the project root for license information.

'use strict';
var _ = require('lodash'),
  execSync = require('child_process').execSync,
  utils = require('./util/utils');

describe('AutoRest Linter validation:', function () {
  let configsToProcess = utils.getConfigFilesChangedInPR();
  // Useful when debugging a test for a particular swagger. 
  // Just update the regex. That will return an array of filtered items.
  // configsToProcess = configsToProcess.filter(function(item) {
  //   return (item.match(/.Microsoft.ContainerRegistry.*2017-03-01.*/ig) !== null);
  // });
  _(configsToProcess).each(function (config) {
    it(config + ' should honor linter validation rules.', function (done) {
      var cmd = `autorest --azure-validator ${config} --message-format=json`;
      console.log(`Executing: ${cmd}`);
      let result;
      try {
        result = execSync(cmd, { encoding: 'utf8' });
        done();
      } catch (err) {
        done(new Error('AutoRest Linter validation failed.'));
      }
    });
  }).value();
});
