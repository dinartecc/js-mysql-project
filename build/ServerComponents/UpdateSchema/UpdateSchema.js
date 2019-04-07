"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UpdateSchema = function UpdateSchema() {
  _fs["default"].readFile(_path["default"].join(__dirname, 'ServerFiles/Schema.json'), 'utf8', function (err, data) {
    if (err) {
      console.log('owo');
    }
  });
};

var _default = UpdateSchema;
exports["default"] = _default;
//# sourceMappingURL=UpdateSchema.js.map