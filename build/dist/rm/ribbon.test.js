"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ribbon_1 = require("./ribbon");
it('InputRibbon is supposed to be empty by default', function () {
    var empty = new ribbon_1.InputRibbon([]);
    expect(empty.getPrevious()).toEqual([]);
    expect(empty.getCurrent()).toEqual(undefined);
    expect(empty.getFollowing()).toEqual([]);
});
it('OutputRibbon is supposed to be empty by default', function () {
    var empty = new ribbon_1.OutputRibbon();
    expect(empty.getPrevious()).toEqual([]);
    expect(empty.getCurrent()).toEqual(undefined);
    expect(empty.getFollowing()).toEqual([]);
});
var arrs = [
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123]
];
it('InputRibbon is supposed to return elements in order [using readAndMove]', function () {
    arrs.forEach(function (val, index, tab) {
        var rb = new ribbon_1.InputRibbon(val);
        val.forEach(function (sv, si, st) {
            expect(sv).toBe(rb.readAndMove());
        });
    });
});
it('InputRibbon is supposed to return elements in order [using read followed with move]', function () {
    arrs.forEach(function (val, index, tab) {
        var rb = new ribbon_1.InputRibbon(val);
        val.forEach(function (sv, si, st) {
            expect(sv).toBe(rb.read());
            rb.move();
        });
    });
});
it('read is not supposed to change index', function () {
    arrs.forEach(function (val, index, tab) {
        var rb = new ribbon_1.InputRibbon(val);
        val.forEach(function (sv, si, st) {
            expect(st[0]).toBe(rb.read());
        });
    });
});
it('OutputRibbon is supposed to store elements in order [writeAndMove]', function () {
    arrs.forEach(function (val, index, tab) {
        var or = new ribbon_1.OutputRibbon();
        val.forEach(function (sv, si, st) {
            or.writeAndMove(sv);
        });
        expect(val).toEqual(or.getEntire());
    });
});
it('OutputRibbon is supposed to store elements in order [write followed with move]', function () {
    arrs.forEach(function (val, index, tab) {
        var or = new ribbon_1.OutputRibbon();
        val.forEach(function (sv, si, st) {
            or.write(sv);
            or.move();
        });
        expect(val).toEqual(or.getEntire());
    });
});
it('write is not supposed to change index', function () {
    arrs.forEach(function (val, index, tab) {
        var or = new ribbon_1.OutputRibbon();
        val.forEach(function (sv, si, st) {
            or.write(sv);
        });
        expect([val[val.length - 1]]).toEqual(or.getEntire());
    });
});
//# sourceMappingURL=ribbon.test.js.map