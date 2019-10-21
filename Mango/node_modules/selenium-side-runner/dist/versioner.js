"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Satisfies;

var _semver = _interopRequireDefault(require("semver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function Satisfies(strGolden, strVersion) {
  const golden = _semver.default.coerce(strGolden);

  const version = _semver.default.coerce(strVersion);

  if (strGolden === strVersion) {
    return;
  } else if (_semver.default.satisfies(version, `^${_semver.default.major(golden)}`)) {
    return _semver.default.gt(version, golden) ? 'project file is older than recommended, in case of issues upgrade the project via the IDE' : 'runner is older than project file, in case of issues upgrade the runner using: `npm i -g selenium-side-runner@latest`';
  } else {
    throw new Error(_semver.default.gt(version, golden) ? 'project file is too old for the runner, upgrade the project via the IDE (or use --force)' : 'runner is too old to run the project file, upgrade the runner using: `npm i -g selenium-side-runner@latest`');
  }
}