import { InputRibbon, OutputRibbon } from './ribbon';

it('InputRibbon is supposed to be empty by default', () => {
    const empty = new InputRibbon([]);
    expect(empty.getPrevious()).toEqual([]);
    expect(empty.getCurrent()).toEqual(undefined);
    expect(empty.getFollowing()).toEqual([]);
});
it('OutputRibbon is supposed to be empty by default', () => {
    const empty = new OutputRibbon();
    expect(empty.getPrevious()).toEqual([]);
    expect(empty.getCurrent()).toEqual(undefined);
    expect(empty.getFollowing()).toEqual([]);
});

let arrs = [
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123],
    [12, 31, 2412, 412, 13, 123]
];

it('InputRibbon is supposed to return elements in order [using readAndMove]', () => {
    arrs.forEach((val, index, tab) => {
        let rb = new InputRibbon(val);
        val.forEach((sv, si, st) => {
            expect(sv).toBe(rb.readAndMove());
        });
    });
});

it('InputRibbon is supposed to return elements in order [using read followed with move]', () => {
    arrs.forEach((val, index, tab) => {
        let rb = new InputRibbon(val);
        val.forEach((sv, si, st) => {
            expect(sv).toBe(rb.read());
            rb.move();
        });
    });
});

it('read is not supposed to change index', () => {
    arrs.forEach((val, index, tab) => {
        let rb = new InputRibbon(val);
        val.forEach((sv, si, st) => {
            expect(st[0]).toBe(rb.read());
        });
    });
});

it('OutputRibbon is supposed to store elements in order [writeAndMove]', () => {
    arrs.forEach((val, index, tab) => {
        let or = new OutputRibbon();
        val.forEach((sv, si, st) => {
            or.writeAndMove(sv);
        });
        expect(val).toEqual(or.getEntire());
    });
});
it('OutputRibbon is supposed to store elements in order [write followed with move]', () => {
    arrs.forEach((val, index, tab) => {
        let or = new OutputRibbon();
        val.forEach((sv, si, st) => {
            or.write(sv);
            or.move();
        });
        expect(val).toEqual(or.getEntire());
    });
});

it('write is not supposed to change index', () => {
    arrs.forEach((val, index, tab) => {
        let or = new OutputRibbon();
        val.forEach((sv, si, st) => {
            or.write(sv);
        });
        expect([val[val.length-1]]).toEqual(or.getEntire());
    });
});
