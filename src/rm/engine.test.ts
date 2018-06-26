import {Engine, Executor} from './engine';
import { State } from './state';
import { Firmware } from './firmware';

let e = new Engine();

it("step", ()=>{
    let s = new State([0,1,2,3,4]);
    let f = new Firmware("TEST\nHALT");
    e.step(s,f);
    expect(1337).toBe(s.mem.get(42));
});
it("step", ()=>{
    let s = new State([0,1,2,3,4]);
    let f = new Firmware("TEST\nHALT");
    e.execute(s,f);
    expect(1337).toBe(s.mem.get(42));
});