#!/usr/bin/env node
// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _util = _interopRequireDefault(require("util"));

var _child_process = require("child_process");

var _commander = _interopRequireDefault(require("commander"));

var _winston = _interopRequireDefault(require("winston"));

var _glob = _interopRequireDefault(require("glob"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _jsBeautify = require("js-beautify");

var _selianize = _interopRequireWildcard(require("selianize"));

var _capabilities = _interopRequireDefault(require("./capabilities"));

var _proxy = _interopRequireDefault(require("./proxy"));

var _config = _interopRequireDefault(require("./config"));

var _versioner = _interopRequireDefault(require("./versioner"));

var _modulePath = _interopRequireDefault(require("./module-path"));

var _package = _interopRequireDefault(require("../package.json"));

var _util2 = require("./util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DEFAULT_TIMEOUT = 15000;
process.title = _package.default.name;

_commander.default.usage('[options] project.side [project.side] [*.side]').version(_package.default.version).option('-c, --capabilities [list]', 'Webdriver capabilities').option('-s, --server [url]', 'Webdriver remote server').option('-p, --params [list]', 'General parameters').option('-f, --filter [string]', 'Run suites matching name').option('-w, --max-workers [number]', 'Maximum amount of workers that will run your tests, defaults to number of cores').option('--base-url [url]', 'Override the base URL that was set in the IDE').option('--timeout [number | undefined]', `The maximimum amount of time, in milliseconds, to spend attempting to locate an element. (default: ${DEFAULT_TIMEOUT})`).option('--proxy-type [type]', 'Type of proxy to use (one of: direct, manual, pac, socks, system)').option('--proxy-options [list]', 'Proxy options to pass, for use with manual, pac and socks proxies').option('--config, --config-file [filepath]', 'Use specified YAML file for configuration. (default: .side.yml)').option('--output-directory [directory]', 'Write test results to files, format is defined by --output-format').option('--output-format [jest | junit]', 'Format for the output. (default: jest)').option('--force', "Forcibly run the project, regardless of project's version").option('--debug', 'Print debug logs');

if (process.env.NODE_ENV === 'development') {
  _commander.default.option('-e, --extract', 'Only extract the project file to code (this feature is for debugging purposes)');

  _commander.default.option('-r, --run [directory]', 'Run the extracted project files (this feature is for debugging purposes)');
}

_commander.default.parse(process.argv);

if (!_commander.default.args.length && !_commander.default.run) {
  _commander.default.outputHelp(); // eslint-disable-next-line no-process-exit


  process.exit(1);
}

_winston.default.cli();

_winston.default.level = _commander.default.debug ? 'debug' : 'info';

if (_commander.default.extract || _commander.default.run) {
  _winston.default.warn("This feature is used by Selenium IDE maintainers for debugging purposes, we hope you know what you're doing!");
}

const configuration = {
  capabilities: {
    browserName: 'chrome'
  },
  params: {},
  runId: _crypto.default.randomBytes(16).toString('hex'),
  path: _path.default.join(__dirname, '../../')
};
const confPath = _commander.default.configFile || '.side.yml';
const configFilePath = _path.default.isAbsolute(confPath) ? confPath : _path.default.join(process.cwd(), confPath);

try {
  Object.assign(configuration, _config.default.load(configFilePath));
} catch (e) {
  _winston.default.debug('Could not load ' + configFilePath);
}

_commander.default.filter = _commander.default.filter || '*';
configuration.server = _commander.default.server ? _commander.default.server : configuration.server;
configuration.timeout = _commander.default.timeout ? +_commander.default.timeout : configuration.timeout ? +configuration.timeout : DEFAULT_TIMEOUT; // eslint-disable-line indent

if (configuration.timeout === 'undefined') configuration.timeout = undefined;

if (_commander.default.capabilities) {
  try {
    configuration.capabilities = _capabilities.default.parseString(_commander.default.capabilities);
  } catch (e) {
    _winston.default.debug('Failed to parse inline capabilities');
  }
}

if (_commander.default.params) {
  try {
    configuration.params = _capabilities.default.parseString(_commander.default.params);
  } catch (e) {
    _winston.default.debug('Failed to parse additional params');
  }
}

if (_commander.default.proxyType) {
  try {
    let opts = _commander.default.proxyOptions;

    if (_commander.default.proxyType === 'manual' || _commander.default.proxyType === 'socks') {
      opts = _capabilities.default.parseString(opts);
    }

    const proxy = (0, _proxy.default)(_commander.default.proxyType, opts);
    Object.assign(configuration, proxy);
  } catch (e) {
    _winston.default.error(e.message); // eslint-disable-next-line no-process-exit


    process.exit(1);
  }
} else if (configuration.proxyType) {
  try {
    const proxy = (0, _proxy.default)(configuration.proxyType, configuration.proxyOptions);
    Object.assign(configuration, proxy);
  } catch (e) {
    _winston.default.error(e.message); // eslint-disable-next-line no-process-exit


    process.exit(1);
  }
}

configuration.baseUrl = _commander.default.baseUrl ? _commander.default.baseUrl : configuration.baseUrl;

configuration.outputFormat = () => ({
  jestArguments: [],
  jestConfiguration: {},
  packageJsonConfiguration: {}
});

if (_commander.default.outputDirectory) {
  const outputDirectory = _path.default.isAbsolute(_commander.default.outputDirectory) ? _commander.default.outputDirectory : _path.default.join('..', _commander.default.outputDirectory);
  const outputFormatConfigurations = {
    jest(project) {
      return {
        jestArguments: ['--json', '--outputFile', _path.default.join(outputDirectory, `${project.name}.json`)],
        jestConfiguration: {},
        packageJsonConfiguration: {}
      };
    },

    junit(project) {
      return {
        jestArguments: [],
        jestConfiguration: {
          reporters: ['default', 'jest-junit']
        },
        packageJsonConfiguration: {
          'jest-junit': {
            outputDirectory: outputDirectory,
            outputName: `${project.name}.xml`
          }
        }
      };
    }

  };
  const format = _commander.default.outputFormat ? _commander.default.outputFormat : 'jest';
  configuration.outputFormat = outputFormatConfigurations[format];

  if (!configuration.outputFormat) {
    const allowedFormats = Object.keys(outputFormatConfigurations).join(', ');

    _winston.default.error(`'${format}'is not an output format, allowed values: ${allowedFormats}`); // eslint-disable-next-line no-process-exit


    process.exit(1);
  }
}

_winston.default.debug(_util.default.inspect(configuration));

let projectPath;

function runProject(project) {
  _winston.default.info(`Running ${project.path}`);

  if (!_commander.default.force) {
    let warning;

    try {
      warning = (0, _versioner.default)(project.version, '2.0');
    } catch (e) {
      return Promise.reject(e);
    }

    if (warning) {
      _winston.default.warn(warning);
    }
  } else {
    _winston.default.warn("--force is set, ignoring project's version");
  }

  if (!project.suites.length) {
    return Promise.reject(new Error(`The project ${project.name} has no test suites defined, create a suite using the IDE.`));
  }

  projectPath = `side-suite-${(0, _util2.sanitizeFileName)(project.name)}`;
  if (!project.dependencies) project.dependencies = {};
  if (_commander.default.outputFormat) project.dependencies['jest-junit'] = '^6.4.0';

  _rimraf.default.sync(projectPath);

  _fs.default.mkdirSync(projectPath);

  _fs.default.writeFileSync(_path.default.join(projectPath, 'package.json'), JSON.stringify(_objectSpread2({
    name: (0, _util2.sanitizeFileName)(project.name),
    version: '0.0.0',
    jest: _objectSpread2({
      extraGlobals: project.jest && project.jest.extraGlobals ? project.jest.extraGlobals : [],
      modulePaths: (0, _modulePath.default)(_path.default.join(__dirname, '../node_modules')),
      setupFilesAfterEnv: [require.resolve('jest-environment-selenium/dist/setup.js')],
      testEnvironment: 'jest-environment-selenium',
      testEnvironmentOptions: configuration
    }, configuration.outputFormat(project).jestConfiguration)
  }, configuration.outputFormat(project).packageJsonConfiguration, {
    dependencies: project.dependencies
  }), null, 2));

  return (0, _selianize.default)(project, {
    silenceErrors: true
  }, project.snapshot).then(code => {
    const tests = code.tests.reduce((tests, test) => {
      return tests += test.code;
    }, 'const utils = require("./utils.js");const tests = {};').concat('module.exports = tests;');
    writeJSFile(_path.default.join(projectPath, 'commons'), tests, '.js');
    writeJSFile(_path.default.join(projectPath, 'utils'), (0, _selianize.getUtilsFile)(), '.js');
    code.suites.forEach(suite => {
      if (!suite.tests) {
        // not parallel
        const cleanup = suite.persistSession ? '' : 'beforeEach(() => {vars = {};});afterEach(async () => (cleanup()));';
        writeJSFile(_path.default.join(projectPath, (0, _util2.sanitizeFileName)(suite.name)), `jest.setMock('selenium-webdriver', webdriver);\n// This file was generated using Selenium IDE\nconst tests = require("./commons.js");${code.globalConfig}${suite.code}${cleanup}`);
      } else if (suite.tests.length) {
        _fs.default.mkdirSync(_path.default.join(projectPath, (0, _util2.sanitizeFileName)(suite.name))); // parallel suite


        suite.tests.forEach(test => {
          writeJSFile(_path.default.join(projectPath, (0, _util2.sanitizeFileName)(suite.name), (0, _util2.sanitizeFileName)(test.name)), `jest.setMock('selenium-webdriver', webdriver);\n// This file was generated using Selenium IDE\nconst tests = require("../commons.js");${code.globalConfig}${test.code}`);
        });
      }
    });
    return new Promise((resolve, reject) => {
      let npmInstall;

      if (project.dependencies && Object.keys(project.dependencies).length) {
        npmInstall = new Promise((resolve, reject) => {
          const child = (0, _child_process.fork)(require.resolve('./npm'), {
            cwd: _path.default.join(process.cwd(), projectPath),
            stdio: 'inherit'
          });
          child.on('exit', code => {
            if (code) {
              reject();
            } else {
              resolve();
            }
          });
        });
      } else {
        npmInstall = Promise.resolve();
      }

      npmInstall.then(() => {
        if (_commander.default.extract) {
          resolve();
        } else {
          runJest(project).then(resolve).catch(reject);
        }
      }).catch(reject);
    });
  });
}

function runJest(project) {
  return new Promise((resolve, reject) => {
    const args = ['--no-watchman', '--testMatch', `{**/*${_commander.default.filter}*/*.test.js,**/*${_commander.default.filter}*.test.js}`].concat(_commander.default.maxWorkers ? ['-w', _commander.default.maxWorkers] : []).concat(configuration.outputFormat(project).jestArguments);
    const opts = {
      cwd: _path.default.join(process.cwd(), projectPath),
      stdio: 'inherit'
    };

    _winston.default.debug('jest worker args');

    _winston.default.debug(args);

    _winston.default.debug('jest work opts');

    _winston.default.debug(opts);

    const child = (0, _child_process.fork)(require.resolve('./child'), args, opts);
    child.on('exit', code => {
      console.log(''); // eslint-disable-line no-console

      if (!_commander.default.run) {
        _rimraf.default.sync(projectPath);
      }

      if (code) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

function runAll(projects, index = 0) {
  if (index >= projects.length) return Promise.resolve();
  return runProject(projects[index]).then(() => {
    return runAll(projects, ++index);
  }).catch(error => {
    process.exitCode = 1;
    error && _winston.default.error(error.message + '\n');
    return runAll(projects, ++index);
  });
}

function writeJSFile(name, data, postfix = '.test.js') {
  _fs.default.writeFileSync(`${name}${postfix}`, (0, _jsBeautify.js_beautify)(data, {
    indent_size: 2
  }));
}

const projects = [..._commander.default.args.reduce((projects, project) => {
  _glob.default.sync(project).forEach(p => {
    projects.add(p);
  });

  return projects;
}, new Set())].map(p => {
  const project = JSON.parse(_fs.default.readFileSync(p));
  project.path = p;
  return project;
});

function handleQuit(_signal, code) {
  if (!_commander.default.run) {
    _rimraf.default.sync(projectPath);
  } // eslint-disable-next-line no-process-exit


  process.exit(code);
}

process.on('SIGINT', handleQuit);
process.on('SIGTERM', handleQuit);

if (_commander.default.run) {
  projectPath = _commander.default.run;
  runJest({
    name: 'test'
  }).catch(_winston.default.error);
} else {
  runAll(projects);
}