"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var Ribbon = /** @class */ (function () {
    function Ribbon() {
    }
    Ribbon.prototype.move = function () {
        util_1.error('not implemented');
    };
    Ribbon.prototype.getPrevious = function () {
        return [];
    };
    Ribbon.prototype.getCurrent = function () {
        return 0;
    };
    Ribbon.prototype.getFollowing = function () {
        return [];
    };
    return Ribbon;
}());
exports.Ribbon = Ribbon;
var InputRibbon = /** @class */ (function (_super) {
    __extends(InputRibbon, _super);
    function InputRibbon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputRibbon.prototype.read = function () {
        return 0;
    };
    InputRibbon.prototype.readAndMove = function () {
        return 0;
    };
    return InputRibbon;
}(Ribbon));
exports.InputRibbon = InputRibbon;
var OutputRibbon = /** @class */ (function (_super) {
    __extends(OutputRibbon, _super);
    function OutputRibbon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OutputRibbon.prototype.write = function () {
        util_1.error('not implemented');
    };
    OutputRibbon.prototype.writeAndMove = function () {
        util_1.error('not implemented');
    };
    return OutputRibbon;
}(Ribbon));
exports.OutputRibbon = OutputRibbon;
//# sourceMappingURL=ribbon.js.map