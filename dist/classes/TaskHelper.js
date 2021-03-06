'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _path = require('path');

var _config = require('../utils/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskHelper = function () {
	function TaskHelper(_ref) {
		var _ref$name = _ref.name,
		    name = _ref$name === undefined ? '' : _ref$name,
		    _ref$requiredPaths = _ref.requiredPaths,
		    requiredPaths = _ref$requiredPaths === undefined ? [] : _ref$requiredPaths,
		    _ref$config = _ref.config,
		    config = _ref$config === undefined ? null : _ref$config;

		_classCallCheck(this, TaskHelper);

		if (null === config) {
			_gulpUtil2.default.log(_gulpUtil2.default.colors.red('The task \'' + name + '\' template is missing a configuration.'));
			return;
		}

		this._name = name;
		this._requiredPaths = requiredPaths;
		this._config = config;
	}

	_createClass(TaskHelper, [{
		key: 'isValid',
		value: function isValid() {
			if (!this.hasPathsDefined) {
				_gulpUtil2.default.log('Missing paths in \'' + _gulpUtil2.default.colors.red(this.name) + '\' task, aborting!');
				return false;
			}
			return true;
		}
	}, {
		key: 'start',
		value: function start() {
			return _gulp2.default.src(this.src, {
				base: this.base,
				cwd: _config.cwd
			});
		}
	}, {
		key: 'end',
		value: function end() {
			return _gulp2.default.dest(this.dest, { cwd: _config.cwd });
		}
	}, {
		key: 'config',
		get: function get() {
			return this._config;
		}
	}, {
		key: 'name',
		get: function get() {
			return this._name;
		}
	}, {
		key: 'requiredPaths',
		get: function get() {
			return this._requiredPaths;
		}
	}, {
		key: 'hasPathsDefined',
		get: function get() {
			var _this = this;

			return this.requiredPaths.every(function (path) {
				return undefined !== _this.config[path];
			});
		}
	}, {
		key: 'src',
		get: function get() {
			return this.config.src;
		}
	}, {
		key: 'base',
		get: function get() {
			return undefined === this.config.base ? '' : (0, _path.join)(_config.cwd, this.config.base);
		}
	}, {
		key: 'dest',
		get: function get() {
			return this.config.dest;
		}
	}, {
		key: 'cacheName',
		get: function get() {
			return this.name + '-task-cache';
		}
	}]);

	return TaskHelper;
}();

exports.default = TaskHelper;