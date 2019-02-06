#!/usr/bin/env node
var path = require('path');
var Skeleton = require('./dist/index').default;
require('yargs')
  .usage('$0 <cmd> [filepath] [framework]')
  .command(
    'diagram [filepath] [framework]',
    'generate diagram',
    yargs => {
      yargs
        .positional('filepath', {
          type: 'string',
          default: '',
          describe: 'target filepath'
        })
        .positional('framework', {
          type: 'string',
          default: '',
          describe: 'Supported frameworks are REACT, ANGULAR or VUE'
        });
    },
    argv => {
      var framework = argv.framework.toUpperCase();
      if (!['REACT', 'ANGULAR', 'VUE'].includes(framework)) {
        console.log('Supported frameworks are REACT, ANGULAR or VUE');
        return;
      }
      var skeleton = new Skeleton(framework);
      var filepath = path.resolve(process.cwd(), argv.filepath);
      skeleton.getDiagram(filepath);
    }
  )
  .help().argv;
