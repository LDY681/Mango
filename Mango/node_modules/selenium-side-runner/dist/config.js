"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

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
function load(config) {
  return _jsYaml.default.safeLoad(_fs.default.readFileSync(config));
}

var _default = {
  load
};
exports.default = _default;