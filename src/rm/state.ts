import { InputRibbon, OutputRibbon } from 'root/rm/ribbon';
import { Memmory } from 'root/rm/memmory';

export class State {
    in: InputRibbon;
    out: OutputRibbon;
    mem: Memmory;
    commandCounter: number;
}