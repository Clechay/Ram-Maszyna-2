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
var Ribbon = /** @class */ (function () {
    function Ribbon() {
        this.nextId = 0;
        this.dataSequence = [];
    }
    Ribbon.prototype.move = function () {
        this.nextId++;
    };
    Ribbon.prototype.getPrevious = function () {
        var result = [];
        for (var i = 0; i < this.nextId; i++) {
            result.push(this.dataSequence[i]);
        }
        return result;
    };
    Ribbon.prototype.getCurrent = function () {
        return this.dataSequence[this.nextId];
    };
    Ribbon.prototype.getFollowing = function () {
        var result = [];
        for (var i = this.nextId + 1; i < this.dataSequence.length; i++) {
            result.push(this.dataSequence[i]);
        }
        return result;
    };
    Ribbon.prototype.getEntire = function () {
        return Object.assign([], this.dataSequence);
    };
    return Ribbon;
}());
exports.Ribbon = Ribbon;
var InputRibbon = /** @class */ (function (_super) {
    __extends(InputRibbon, _super);
    function InputRibbon(arr) {
        var _this = _super.call(this) || this;
        _this.dataSequence = Object.assign([], arr);
        return _this;
    }
    InputRibbon.prototype.read = function () {
        return this.dataSequence[this.nextId];
    };
    InputRibbon.prototype.readAndMove = function () {
        this.nextId++;
        return this.dataSequence[this.nextId - 1];
    };
    return InputRibbon;
}(Ribbon));
exports.InputRibbon = InputRibbon;
var OutputRibbon = /** @class */ (function (_super) {
    __extends(OutputRibbon, _super);
    function OutputRibbon() {
        var _this = _super.call(this) || this;
        _this.dataSequence = [];
        return _this;
    }
    OutputRibbon.prototype.write = function (val) {
        this.dataSequence[this.nextId] = val;
    };
    OutputRibbon.prototype.writeAndMove = function (val) {
        this.write(val);
        this.move();
    };
    return OutputRibbon;
}(Ribbon));
exports.OutputRibbon = OutputRibbon;
//# sourceMappingURL=ribbon.js.map