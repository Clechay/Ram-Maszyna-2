import { State } from './state';

it('State is not supposed to have any undefined elements', () => {
    const empty = new State([1, 3, 3, 7]);
    expect(empty.in).toBeDefined();
    expect(empty.out).toBeDefined();
    expect(empty.mem).toBeDefined();
    expect(empty.commandCounter).toBeDefined();
});
it('States counter is supposed to start with 0', () => {
    const empty = new State([1, 3, 3, 7]);
    expect(empty.commandCounter).toEqual(0);
});
it('States constructor is supposed to pass argument to InputRibbon', () => {
    const empty = new State([1, 3, 3, 7]);
    expect(empty.in.getEntire()).toEqual([1, 3, 3, 7]);
});