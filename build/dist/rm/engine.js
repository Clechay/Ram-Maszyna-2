"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firmware_1 = require("./firmware");
var Executor = /** @class */ (function () {
    function Executor(func) {
        console.warn('not ready');
    }
    Executor.prototype.perform = function (prev, arg) {
        return prev;
    };
    Executor.prototype.exec = function (prev, arg) {
        if (!this.allowedArgs.includes(arg.type)) {
            throw 'illegal argument type';
        }
        return this.perform(prev, arg);
    };
    return Executor;
}());
exports.Executor = Executor;
var Engine = /** @class */ (function () {
    function Engine() {
        this.executors = new Map([
            [
                'ADD',
                new Executor(function (prev, arg) {
                    if (arg.value === '') {
                        throw 'ADD: MISSING ARGUMENT';
                    }
                    switch (arg.type) {
                        case firmware_1.DataTokenType.LABEL:
                            throw 'ADD: ILLEGAL ARGUMENT \'label\'';
                        case firmware_1.DataTokenType.NUMBER:
                            prev.mem.set(0, prev.mem.get(0) + Number(arg.value));
                            break;
                        case firmware_1.DataTokenType.ADDRESS_TO_NUMBER:
                            prev.mem.set(0, prev.mem.get(0) + prev.mem.get(Number(arg.value)));
                            break;
                        case firmware_1.DataTokenType.ADDRESS_TO_ADDRESS:
                            prev.mem.set(0, prev.mem.get(0) + prev.mem.get(prev.mem.get(Number(arg.value))));
                            break;
                        default:
                            throw 'ADD: ILLEGAL ARGUMENT \'' + arg.type + '\'';
                    }
                    prev.commandCounter++;
                    return prev;
                })
            ],
            [
                'SUB',
                new Executor(function (prev, arg) {
                    if (arg.value === '') {
                        throw 'ADD: MISSING ARGUMENT';
                    }
                    switch (arg.type) {
                        case firmware_1.DataTokenType.LABEL:
                            throw 'ADD: ILLEGAL ARGUMENT \'label\'';
                        case firmware_1.DataTokenType.NUMBER:
                            prev.mem.set(0, prev.mem.get(0) - Number(arg.value));
                            break;
                        case firmware_1.DataTokenType.ADDRESS_TO_NUMBER:
                            prev.mem.set(0, prev.mem.get(0) - prev.mem.get(Number(arg.value)));
                            break;
                        case firmware_1.DataTokenType.ADDRESS_TO_ADDRESS:
                            prev.mem.set(0, prev.mem.get(0) - prev.mem.get(prev.mem.get(Number(arg.value))));
                            break;
                        default:
                            throw 'ADD: ILLEGAL ARGUMENT \'' + arg.type + '\'';
                    }
                    prev.commandCounter++;
                    return prev;
                })
            ]
        ]);
    }
    Engine.prototype.step = function (prev, firmware) {
        var cmd = firmware.commands[prev.commandCounter];
        var exe = this.executors.get(cmd.commandId);
        if (typeof exe !== 'undefined') {
            exe.exec(prev, cmd.arg);
        }
        else {
            throw 'unsupported command id';
        }
        return prev;
    };
    Engine.prototype.execute = function (prev, firmware) {
        return prev;
    };
    Engine.prototype.debug = function (prev, firmware, term) {
        return prev;
    };
    return Engine;
}());
exports.Engine = Engine;
//# sourceMappingURL=engine.js.map