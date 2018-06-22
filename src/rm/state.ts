import { InputRibbon, OutputRibbon } from './ribbon';
import { Memmory } from './memmory';

export class State {
    in: InputRibbon;
    out: OutputRibbon;
    mem: Memmory;
    commandCounter: number;

    constructor(input : number[]){
        this.in = new InputRibbon(input);
        this.out = new OutputRibbon();
        this.mem = new Memmory();
        this.commandCounter = 0;
    }
}