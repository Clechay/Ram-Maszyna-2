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


let c2 = [
"czytaj: READ 1",
"LOAD 1",
"JZERO .koniec",
"ADD 2",
"STORE 2",
"JUMP .czytaj",
"koniec: WRITE 2",
"HALT"
].reduce((a,b)=>a+"\n"+b,"").substring(1);


it("integration", ()=>{
    let s = new State([1,2,3,0]);
    let f = new Firmware(c2);
    e.execute(s,f);
    expect(s.out.getEntire()).toEqual([6]);
    console.log(s);
});



