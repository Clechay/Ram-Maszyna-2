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
var TerminationRule = /** @class */ (function () {
    function TerminationRule() {
    }
    TerminationRule.prototype.check = function (state, firmware) {
        return false;
    };
    return TerminationRule;
}());
exports.TerminationRule = TerminationRule;
var TerminateAtLine = /** @class */ (function (_super) {
    __extends(TerminateAtLine, _super);
    function TerminateAtLine(line_number) {
        var _this = _super.call(this) || this;
        _this.nr = line_number;
        return _this;
    }
    TerminateAtLine.prototype.check = function (state, firmware) {
        return state.commandCounter === this.nr;
    };
    return TerminateAtLine;
}(TerminationRule));
exports.TerminateAtLine = TerminateAtLine;
var Terminator = /** @class */ (function () {
    function Terminator() {
    }
    Terminator.prototype.check = function (state, firmware) {
        for (var _i = 0, _a = this.rules; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.check(state, firmware))
                return true;
        }
        return false;
    };
    return Terminator;
}());
exports.Terminator = Terminator;
//# sourceMappingURL=termination.js.map