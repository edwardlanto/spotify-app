"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/login";
exports.ids = ["pages/login"];
exports.modules = {

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Login({ providers  }) {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col items-center bg-black min-h-screen w-full justify-center\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                className: \"w-52 mb-5\",\n                src: \"https://links.papareact.com/9xl\"\n            }, void 0, false, {\n                fileName: \"/Users/edwardlanto/Desktop/spotify-app/pages/login.js\",\n                lineNumber: 7,\n                columnNumber: 13\n            }, this),\n            Object.values(providers).map((provider, i)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"bg-[#18D860] text-white p-5 rounded-full\",\n                        onClick: ()=>(0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signIn)(provider.id, {\n                                callbackUrl: \"/\"\n                            })\n                        ,\n                        children: [\n                            \"Login with \",\n                            provider.name\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/edwardlanto/Desktop/spotify-app/pages/login.js\",\n                        lineNumber: 10,\n                        columnNumber: 21\n                    }, this)\n                }, i, false, {\n                    fileName: \"/Users/edwardlanto/Desktop/spotify-app/pages/login.js\",\n                    lineNumber: 9,\n                    columnNumber: 17\n                }, this)\n            )\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/edwardlanto/Desktop/spotify-app/pages/login.js\",\n        lineNumber: 6,\n        columnNumber: 9\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);\nasync function getServerSideProps() {\n    const providers = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.getProviders)();\n    return {\n        props: {\n            providers\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9sb2dpbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBeUI7QUFDNkI7U0FFN0NHLEtBQUssQ0FBQyxDQUFDLENBQUNDLFNBQVMsRUFBQyxDQUFDLEVBQUUsQ0FBQztJQUMzQixNQUFNLDZFQUNEQyxDQUFHO1FBQUNDLFNBQVMsRUFBQyxDQUF3RTs7d0ZBQ2xGQyxDQUFHO2dCQUFDRCxTQUFTLEVBQUMsQ0FBVztnQkFBQ0UsR0FBRyxFQUFDLENBQWlDOzs7Ozs7WUFDL0RDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDTixTQUFTLEVBQUVPLEdBQUcsRUFBRUMsUUFBUSxFQUFFQyxDQUFDLCtFQUNyQ1IsQ0FBRzswR0FDQ1MsQ0FBTTt3QkFBQ1IsU0FBUyxFQUFDLENBQTBDO3dCQUMxRFMsT0FBTyxNQUFRYix1REFBTSxDQUFDVSxRQUFRLENBQUNJLEVBQUUsRUFBRSxDQUFDO2dDQUFDQyxXQUFXLEVBQUUsQ0FBRzs0QkFBQSxDQUFDOzs7NEJBQUksQ0FBVzs0QkFBQ0wsUUFBUSxDQUFDTSxJQUFJOzs7Ozs7O21CQUYvRUwsQ0FBQzs7Ozs7Ozs7Ozs7O0FBTzNCLENBQUM7QUFFRCxpRUFBZVYsS0FBSztBQUViLGVBQWVnQixrQkFBa0IsR0FBRSxDQUFDO0lBQ3ZDLEtBQUssQ0FBQ2YsU0FBUyxHQUFHLEtBQUssQ0FBQ0gsNkRBQVk7SUFFcEMsTUFBTSxDQUFDLENBQUM7UUFDSm1CLEtBQUssRUFBRSxDQUFDO1lBQ0poQixTQUFTO1FBQ2IsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvbG9naW4uanM/ODFiMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0UHJvdmlkZXJzLCBzaWduSW4gfSBmcm9tICduZXh0LWF1dGgvcmVhY3QnO1xuXG5mdW5jdGlvbiBMb2dpbih7IHByb3ZpZGVycyB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBiZy1ibGFjayBtaW4taC1zY3JlZW4gdy1mdWxsIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT1cInctNTIgbWItNVwiIHNyYz1cImh0dHBzOi8vbGlua3MucGFwYXJlYWN0LmNvbS85eGxcIiAvPlxuICAgICAgICAgICAge09iamVjdC52YWx1ZXMocHJvdmlkZXJzKS5tYXAoKHByb3ZpZGVyLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJnLVsjMThEODYwXSB0ZXh0LXdoaXRlIHAtNSByb3VuZGVkLWZ1bGxcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNpZ25Jbihwcm92aWRlci5pZCwgeyBjYWxsYmFja1VybDogXCIvXCJ9ICl9PkxvZ2luIHdpdGgge3Byb3ZpZGVyLm5hbWV9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dpblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKCl7XG4gICAgY29uc3QgcHJvdmlkZXJzID0gYXdhaXQgZ2V0UHJvdmlkZXJzKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgcHJvdmlkZXJzXG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJnZXRQcm92aWRlcnMiLCJzaWduSW4iLCJMb2dpbiIsInByb3ZpZGVycyIsImRpdiIsImNsYXNzTmFtZSIsImltZyIsInNyYyIsIk9iamVjdCIsInZhbHVlcyIsIm1hcCIsInByb3ZpZGVyIiwiaSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJpZCIsImNhbGxiYWNrVXJsIiwibmFtZSIsImdldFNlcnZlclNpZGVQcm9wcyIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/login.js\n");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/login.js"));
module.exports = __webpack_exports__;

})();