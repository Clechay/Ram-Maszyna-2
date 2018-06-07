"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Memmory = /** @class */ (function () {
    function Memmory() {
    }
    Memmory.prototype.set = function (id, value) {
        this.cells[id] = value;
    };
    Memmory.prototype.get = function (id) {
        if (typeof this.cells[id] === typeof undefined) {
            throw 'getting from unused memmory';
        }
        return this.cells[id];
    };
    Memmory.prototype.getAll = function () {
        return Object.assign([], this.cells);
    };
    return Memmory;
}());
exports.Memmory = Memmory;
//# sourceMappingURL=memmory.js.map