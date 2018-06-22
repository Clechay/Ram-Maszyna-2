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

let executors: Executor[];
let ex = new Executor("TEST");
ex.handlers.set(DataTokenType.NULL, (prev, arg) => {
    prev.mem.set(42,1337);
    return prev;});


export class Engine {
    executors: Map<string, Executor>;

    constructor() {
        this.executors = new Map<string, Executor>();
        executors.forEach((value, index, array) => {
            this.executors.set(value.name,value);
        })
    }

    step(prev: State, firmware: Firmware): State {
        let cmd: Command = firmware.commands[prev.commandCounter];
        let exe = this.executors.get(cmd.commandId);
        if (typeof exe !== 'undefined') {
            exe.exec(prev, cmd.arg);
        }
        else {
            throw 'unsupported command id';
        }
        return prev;
    }

    execute(prev: State, firmware: Firmware): State {
        while(firmware.commands[prev.commandCounter].commandId != "HALT")
            prev = this.step(prev,firmware);
    }

    debug(prev: State, firmware: Firmware, term: Terminator): State {
        throw "not ready";
        return prev;
    }
}