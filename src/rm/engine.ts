import { Command, DataToken, DataTokenType, Firmware } from './firmware';
import { State } from './state';
import { Terminator } from './termination';

export class Executor {
    name: string;
    handlers: Map <DataTokenType,(prev: State, arg: DataToken)=>State>;

    doable(argT: DataTokenType): boolean {
        return this.handlers.has(argT);
    }

    exec(prev: State, arg: DataToken): State {
        if (!this.doable(arg.type)) {
            throw 'illegal argument type';
        }
        return this.handlers.get(arg.type)(prev, arg);
    }

    constructor(name: string) {
        this.name = name;
        this.handlers = new Map<DataTokenType, (prev: State, arg: DataToken)=>State>();
    }
}

let executors: Executor[] = [];
let ex = new Executor("TEST");
ex.handlers.set(DataTokenType.NULL, (prev, arg) => {
    prev.mem.set(42,1337);
    return prev;});
executors.push(ex);

export class Engine {
    executors: Map<string, Executor>;

    constructor() {
        this.executors = new Map<string, Executor>();
        executors.forEach((value, index, array) => {
            this.executors.set(value.name,value);
        })
    }

    step(prev: State, firmware: Firmware): State {
        console.error("cc: "+ prev.commandCounter)
        let cmd = firmware.commands[prev.commandCounter];
        console.error(cmd.commandId)
        let exe = this.executors.get(cmd.commandId);
        if (typeof exe !== 'undefined') {
            exe.exec(prev, cmd.arg);
        }
        else {
            console.error(cmd.commandId)
            console.error(exe)
            throw 'unsupported command id';
        }
        return prev;
    }

    execute(prev: State, firmware: Firmware): State {
        console.log(prev.commandCounter);
        console.log(firmware.commands);
        while(firmware.commands[prev.commandCounter].commandId != "HALT") {
            prev = this.step(prev, firmware);
            console.log(prev.commandCounter);
            console.log(firmware.commands);
        }
        return prev;
    }

    debug(prev: State, firmware: Firmware, term: Terminator): State {
        while(!term.check(Object.assign(Object,prev),firmware) && firmware.commands[prev.commandCounter].commandId != "HALT"){
            this.step(prev,firmware);
        }
        return prev;
    }
}