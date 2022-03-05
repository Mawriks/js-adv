/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/components/cart.js":
/*!**************************************!*\
  !*** ./public/js/components/cart.js ***!
  \**************************************/
/***/ (() => {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nVue.component('cart-item', {\n  props: ['product'],\n  template: \"<div class=\\\"cart-item\\\"> \\n                    <img :src=\\\"product.image\\\" :alt=\\\"product.product_name\\\">\\n                    <p>{{ product.product_name }}</p> \\n                    <p><small>x{{ product.quantity }}<br/>{{ '$' + product.price }}</small></p>\\n                    <p><b>{{ '$' + product.total }}</b></p> \\n                    <button @click=\\\"$parent.removeProduct(product)\\\" :data-id=\\\"product.id_product\\\" class=\\\"del\\\">x</button>\\n                </div>\"\n});\nVue.component('cart', {\n  data: function data() {\n    return {\n      cart: [],\n      show: false\n    };\n  },\n  methods: {\n    addProduct: function addProduct(product) {\n      var _this = this;\n\n      var find = this.cart.find(function (el) {\n        return el.id_product === product.id_product;\n      });\n\n      if (find) {\n        this.$parent.putJson(\"/api/cart/\".concat(find.id_product), {\n          quantity: 1,\n          total: find.price\n        }).then(function (data) {\n          if (data.result === 1) {\n            find.quantity++;\n            find.total = find.quantity * find.price;\n          }\n        });\n      } else {\n        Vue.set(product, 'quantity', 1);\n        Vue.set(product, 'total', product.price);\n        console.log(product);\n        this.$parent.postJson(\"/api/cart/\".concat(product.id_product), product).then(function (data) {\n          if (data.result === 1) {\n            _this.cart.push(product);\n          }\n        });\n      }\n    },\n    removeProduct: function removeProduct(product) {\n      var _this2 = this;\n\n      var find = this.cart.find(function (el) {\n        return el.id_product === product.id_product;\n      });\n\n      if (find && find.quantity > 1) {\n        this.$parent.delJson(\"/api/cart/del/\".concat(find.id_product), {\n          method: 'del',\n          total: find.price\n        }).then(function (data) {\n          if (data.result === 1) {\n            find.quantity--;\n            find.total = find.quantity * find.price;\n          }\n        });\n      } else {\n        this.$parent.delJson(\"/api/cart/del/\".concat(find.id_product), {\n          method: 'remove'\n        }).then(function (data) {\n          if (data.result === 1) {\n            _this2.cart.splice(_this2.cart.indexOf(find), 1);\n          }\n        });\n      }\n    }\n  },\n  template: \"<div class=\\\"cart-wrap\\\">\\n                    <button class=\\\"btn-cart\\\" type=\\\"button\\\" @click=\\\"show = !show\\\"> \\n                        <svg width=\\\"32\\\" height=\\\"29\\\"><use xlink:href=\\\"#cart-ico\\\"></use></svg> \\n                        <span>\\u041A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430</span>\\n                    </button>\\n                    <div class=\\\"cart\\\" style=\\\"display: none;\\\" v-show=\\\"show\\\">\\n                        <p v-if=\\\"!cart.length\\\">\\u0412\\u0430\\u0448\\u0430 \\u043A\\u043E\\u0440\\u0437\\u0438\\u043D\\u0430 \\u043F\\u0443\\u0441\\u0442\\u0430!</p>\\n                        <div v-else class=\\\"cart__body\\\">\\n                            <cart-item v-for=\\\"item of cart\\\" :product=\\\"item\\\" :key=\\\"item.id_product\\\"></cart-item>\\n                        </div>\\n                    </div>\\n                </div>\",\n  mounted: function mounted() {\n    var _this3 = this;\n\n    this.$parent.getJson(\"/api/cart\").then(function (data) {\n      if (data.contents.length) {\n        var _iterator = _createForOfIteratorHelper(data.contents),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var el = _step.value;\n            el.total = el.quantity * el.price;\n\n            _this3.cart.push(el);\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n      }\n    });\n  }\n});\n\n//# sourceURL=webpack://js-adv/./public/js/components/cart.js?");

/***/ }),

/***/ "./public/js/components/error.js":
/*!***************************************!*\
  !*** ./public/js/components/error.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('error', {\n  data: function data() {\n    return {\n      text: ''\n    };\n  },\n  template: \"<p v-if=\\\"text!==''\\\">{{ text }}</p>\"\n});\n\n//# sourceURL=webpack://js-adv/./public/js/components/error.js?");

/***/ }),

/***/ "./public/js/components/product-list.js":
/*!**********************************************!*\
  !*** ./public/js/components/product-list.js ***!
  \**********************************************/
/***/ (() => {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nVue.component('product-item', {\n  props: ['product'],\n  template: \"<div class=\\\"product-item\\\" :data-id=\\\"product.id_product\\\">\\n                    <img :src=\\\"product.image\\\" :alt=\\\"product.product_name\\\">\\n                    <h3>{{ product.product_name }}</h3>\\n                    <p>{{ '$' + product.price }}</p>\\n                    <button class=\\\"buy-btn\\\" @click=\\\"$root.$refs.cart.addProduct(product)\\\">\\u041A\\u0443\\u043F\\u0438\\u0442\\u044C</button>\\n                </div>\"\n});\nVue.component('products-list', {\n  props: ['products'],\n  template: \"<div class=\\\"container\\\">\\n                    <div class=\\\"products\\\">\\n                        <product-item v-for=\\\"product of products\\\" :product=\\\"product\\\" :key=\\\"product.id_product\\\"></product-item>\\n                    </div>\\n                </div>\",\n  mounted: function mounted() {\n    var _this = this;\n\n    this.$parent.getJson(\"/api/products\").then(function (data) {\n      var _iterator = _createForOfIteratorHelper(data),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var el = _step.value;\n\n          _this.$parent.products.push(el);\n\n          _this.$parent.filtered.push(el);\n\n          _this.$parent.totalPrice += el.price;\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n    });\n  }\n});\n\n//# sourceURL=webpack://js-adv/./public/js/components/product-list.js?");

/***/ }),

/***/ "./public/js/components/search-items.js":
/*!**********************************************!*\
  !*** ./public/js/components/search-items.js ***!
  \**********************************************/
/***/ (() => {

eval("Vue.component('search-items', {\n  data: function data() {\n    return {\n      userSearch: ''\n    };\n  },\n  methods: {\n    filter: function filter() {\n      var regexp = new RegExp(this.userSearch, 'i');\n      this.$parent.filtered = this.$parent.products.filter(function (product) {\n        return regexp.test(product.product_name);\n      });\n    }\n  },\n  template: \"<form action=\\\"#\\\" @submit.prevent=\\\"filter()\\\" class=\\\"search-form\\\">\\n                    <!-- \\u0414\\u043B\\u044F \\u0444\\u0438\\u043B\\u044C\\u0442\\u0440\\u0430\\u0446\\u0438\\u0438 \\u0432 \\u0440\\u0435\\u0436\\u0438\\u043C\\u0435 \\u043E\\u043D\\u043B\\u0430\\u0439\\u043D @input=\\\"filter()\\\" -->\\n                    <input type=\\\"text\\\" placeholder=\\\"Search...\\\" class=\\\"search-field\\\" v-model=\\\"userSearch\\\">\\n                    <button class=\\\"btn-search\\\" type=\\\"submit\\\">\\n                        <svg width=\\\"20\\\" height=\\\"20\\\"><use xlink:href=\\\"#search-ico\\\"></use></svg>\\n                    </button>\\n                </form>\"\n});\n\n//# sourceURL=webpack://js-adv/./public/js/components/search-items.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\nvar app = new Vue({\n  el: '#app',\n  data: {\n    products: [],\n    filtered: [],\n    totalPrice: 0,\n    error: false\n  },\n  methods: {\n    getJson: function getJson(url) {\n      var _this = this;\n\n      return fetch(url).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (error) {\n        _this.$refs.error.text = error;\n      });\n    },\n    postJson: function postJson(url, data) {\n      var _this2 = this;\n\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (error) {\n        _this2.$refs.error.text = error;\n      });\n    },\n    putJson: function putJson(url, data) {\n      var _this3 = this;\n\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (error) {\n        _this3.$refs.error.text = error;\n      });\n    },\n    delJson: function delJson(url, data) {\n      var _this4 = this;\n\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(function (result) {\n        return result.json();\n      })[\"catch\"](function (error) {\n        _this4.$refs.error.text = error;\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack://js-adv/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/components/cart.js"]();
/******/ 	__webpack_modules__["./public/js/components/error.js"]();
/******/ 	__webpack_modules__["./public/js/components/product-list.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/components/search-items.js"]();
/******/ 	
/******/ })()
;