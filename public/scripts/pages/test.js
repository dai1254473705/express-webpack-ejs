/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://127.0.0.1:3000/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * 专题提交页面相关js
 * daiyunzhou 2019/03/29 18:10
 * last modify: 2019/03/29 18:10
 */
$(function () {
    function ZTFORM() {
        // state
        this.state = {
            province: '', // 省
            city: '', // 市
            type: '', // 类型
            title: '', //  标题
            desc: '' // 描述
        };
        // ajax 
        this.submit = function () {
            for (var key in this.state) {
                var props = this.state[key];
                var toast = $('.zt-toast');
                var tips = toast.find('.zt-tips');
                if (!props) {
                    console.log(key);

                    switch (key) {
                        case 'province':
                            toast.addClass('zt-show');
                            tips.html('省份不能为空');
                            break;
                        case 'city':
                            toast.addClass('zt-show');
                            tips.html('城市不能为空');
                            break;
                        case 'type':
                            break;
                        default:
                            toast.addClass('zt-show');
                            tips.html(key + '不存在');
                    }
                    setTimeout(function () {
                        toast.removeClass('zt-show');
                    }, 2000);
                    return;
                }
                // 调用接口
                // TODO
            }
        };
        // 事件相关处理
        this.event = function () {
            var that = this;
            // select 
            $('.zt-select').on('change', function () {
                var props = $(this).attr('name');
                var val = $(this).find("option:selected").attr("value");
                switch (props) {
                    case 'province':
                        that.state.province = val;
                        // 判断city
                        if (!val) {
                            $('.zt-city').parents('.zt-form-item').addClass('zt-hidden');
                            that.state.city = '';
                        } else {
                            $('.zt-city').parents('.zt-form-item').removeClass('zt-hidden');
                            that.state.city = '';
                        }
                        break;
                    case 'city':
                        that.state.city = val;
                        break;
                    case 'type':
                        that.state.type = val;
                        break;
                    default:
                        $('.zt-toast').addClass('zt-show');
                        $('.zt-tips').html('不存在的下拉框');
                        return;
                }
                console.log(that.state);
            });
            // textarea input
            $('.zt-textarea').on('input', function () {
                var val = $(this).val();
                var props = $(this).attr('name');
                if (props === 'desc') {
                    that.state.desc = val;
                } else if (props === 'title') {
                    that.state.title = val;
                } else {
                    $('.zt-toast').addClass('zt-show');
                    $('.zt-tips').html('不存在的输入框');
                }
            });
            // 提交
            $('.zt-confirm').on('click', function () {
                that.submit();
            });
            // 取消
            $('.zt-cancel').on('click', function () {
                for (var key in that.state) {
                    that.state[key] = '';
                }
                $('.zt-form-body')[0].reset();
            });
        };

        // init ZTFORM
        this.init = function () {
            this.event();
        };
    };
    var ztfrom = new ZTFORM();
    ztfrom.init();
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)))

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = window.$;

/***/ })

/******/ });