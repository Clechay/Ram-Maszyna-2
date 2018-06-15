"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("components/App");
var registerServiceWorker_1 = require("./registerServiceWorker");
require("./index.css");
ReactDOM.render(React.createElement(App_1.default, null), document.getElementById('root'));
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map