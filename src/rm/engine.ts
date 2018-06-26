import { Command, DataToken, DataTokenType, Firmware } from './firmware';
import { State } from './state';
import { Terminator } from './termination';

export class Executor {
    name: string;
    handlers: Map <DataTokenType,(prev: State, arg: DataToken, firm: Firmware)=>State>;

    doable(argT: DataTokenType): boolean {
        return this.handlers.has(argT);
    }

    exec(prev: State, arg: DataToken, firm: Firmware): State {
        if (!this.doable(arg.type)) {
            throw 'illegal argument type';
        }
        return this.handlers.get(arg.type)(prev, arg, firm);
    }

    constructor(name: string) {
        this.name = name;
        this.handlers = new Map<DataTokenType, (prev: State, arg: DataToken)=>State>();
    }
}

let executors: Executor[] = [];
let ex;

// TEST
ex = new Executor("TEST");
ex.handlers.set(DataTokenType.NULL, (prev, arg, firm) => {
    prev.mem.set(42,1337);
    return prev;});
executors.push(ex);

// NOP
ex = new Executor("NOP");
ex.handlers.set(DataTokenType.NULL, (prev, arg, firm) => {return prev;});
executors.push(ex);

// ADD
ex = new Executor("ADD");
ex.handlers.set(DataTokenType.NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)+arg);
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)+prev.mem.get(arg));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)+prev.mem.get(prev.mem.get(arg)));
    return prev;
});
executors.push(ex);

// SUB
ex = new Executor("SUB");
ex.handlers.set(DataTokenType.NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)-arg);
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)-prev.mem.get(arg));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)-prev.mem.get(prev.mem.get(arg)));
    return prev;
});
executors.push(ex);

// MULT
ex = new Executor("MULT");
ex.handlers.set(DataTokenType.NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)*arg);
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)*prev.mem.get(arg));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)*prev.mem.get(prev.mem.get(arg)));
    return prev;
});
executors.push(ex);

// DIV
ex = new Executor("DIV");
ex.handlers.set(DataTokenType.NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)/arg);
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)/prev.mem.get(arg));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)/prev.mem.get(prev.mem.get(arg)));
    return prev;
});
executors.push(ex);

// MOD
ex = new Executor("MOD");
ex.handlers.set(DataTokenType.NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)%arg);
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)%prev.mem.get(arg));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(0)%prev.mem.get(prev.mem.get(arg)));
    return prev;
});
executors.push(ex);


// LOAD
ex = new Executor("LOAD");
ex.handlers.set(DataTokenType.NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,arg);
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(arg));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(0,prev.mem.get(prev.mem.get(arg)));
    return prev;
});
executors.push(ex);

// STORE
ex = new Executor("STORE");
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(prev.mem.get(arg),prev.mem.get(0));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(prev.mem.get(prev.mem.get(arg)),prev.mem.get(0));
    return prev;
});
executors.push(ex);

// JUMP
ex = new Executor("JUMP");
ex.handlers.set(DataTokenType.LABEL, (prev, arg, firm) => {
    prev.commandCounter = firm.map.get(arg);
    return prev;
});

// JZERO
ex = new Executor("JZERO");
ex.handlers.set(DataTokenType.LABEL, (prev, arg, firm) => {
    if(prev.mem.get(0) === 0)
        prev.commandCounter = firm.map.get(arg);
    return prev;
});
executors.push(ex);

// JGTZ
ex = new Executor("JGTZ");
ex.handlers.set(DataTokenType.LABEL, (prev, arg, firm) => {
    if(prev.mem.get(0) >= 0)
        prev.commandCounter = firm.map.get(arg);
    return prev;
});
executors.push(ex);

// JLTZ
ex = new Executor("JLTZ");
ex.handlers.set(DataTokenType.LABEL, (prev, arg, firm) => {
    if(prev.mem.get(0) <= 0)
        prev.commandCounter = firm.map.get(arg);
    return prev;
});
executors.push(ex);

// WRITE
ex = new Executor("WRITE");
ex.handlers.set(DataTokenType.NUMBER, (prev, arg, firm) => {
    prev.out.writeAndMove(arg);
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.out.writeAndMove(prev.mem.get(arg));
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.out.writeAndMove(prev.mem.get(prev.mem.get(arg)));
    return prev;
});
executors.push(ex);

// READ
ex = new Executor("READ");
ex.handlers.set(DataTokenType.ADDRESS_TO_NUMBER, (prev, arg, firm) => {
    prev.mem.set(arg,prev.in.readAndMove());
    return prev;
});
ex.handlers.set(DataTokenType.ADDRESS_TO_ADDRESS, (prev, arg, firm) => {
    prev.mem.set(prev.mem.get(arg),prev.in.readAndMove());
    return prev;
});
executors.push(ex);

// HALT
ex = new Executor("HALT");
ex.handlers.set(DataTokenType.NULL, (prev, arg, firm) => {
    prev.halted = true;
    return prev;});
executors.push(ex);


export class Engine {
    executors: Map<string, Executor>;
    static nextCmd(s: State, f: Firmware):Command{
        return f.commands[s.commandCounter];
    }
    static halt(s: State, f: Firmware):boolean{
        return s.halted;
    }
    constructor() {
        this.executors = new Map<string, Executor>();
        executors.forEach((value, index, array) => {
            this.executors.set(value.name,value);
        })
    }

    step(prev: State, firmware: Firmware): State {
        let cmd = Engine.nextCmd(prev,firmware);
        let exe = this.executors.get(cmd.id);
        if (typeof exe !== 'undefined') {
            if(exe.doable(cmd.arg.type)){
                exe.exec(prev, cmd.arg, firmware);
                if(!Engine.halt(prev,firmware)) prev.commandCounter++;
            }
            else throw 'unsupported command arg type';
        }
        else {
            throw 'unsupported command id';
        }
        return prev;
    }

    execute(prev: State, firmware: Firmware): State {
        let c = 0;
        while(!Engine.halt(prev,firmware)) {
            if(c > 20) break; c++;
            prev = this.step(prev, firmware);
        }
        return prev;
    }

    debug(prev: State, firmware: Firmware, term: Terminator): State {
        while(!term.check(Object.assign(Object,prev),firmware) && !Engine.halt(prev,firmware)){
            this.step(prev,firmware);
        }
        return prev;
    }
}