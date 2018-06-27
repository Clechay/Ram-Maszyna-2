import { Engine } from './engine';
import { State } from './state';
import { Firmware } from './firmware';

let e = new Engine();

it('step', () => {
    let s = new State([0, 1, 2, 3, 4]);
    let f = new Firmware('TEST\nHALT');
    e.step(s, f);
    expect(1337).toBe(s.mem.get(42));
});
it('step', () => {
    let s = new State([0, 1, 2, 3, 4]);
    let f = new Firmware('TEST\nHALT');
    e.execute(s, f);
    expect(1337).toBe(s.mem.get(42));
});
it('integration', () => {
    let srcCode = [
        'LOAD =0',
        'STORE 1',
        'czytaj: READ 0',
        'JZERO .koniec',
        'ADD 1',
        'STORE 1',
        'JUMP .czytaj',
        'koniec: WRITE 1',
        'HALT'
    ].reduce((a, b) => a + '\n' + b, '').substring(1);
    let s = new State([1, 2, 3, 0]);
    let f = new Firmware(srcCode);
    console.log(f);
    e.execute(s, f);
    expect(s.out.getEntire()).toEqual([6]);
    console.log(s);
});