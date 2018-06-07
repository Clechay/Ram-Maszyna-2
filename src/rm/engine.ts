import { Command, Firmware , DataTokenType, DataToken} from './firmware';
import { State } from './state';
import { Terminator } from './termination';

export class Executor{
    allowed_args : DataTokenType[];
    perform(prev : State, arg : DataToken):State{
        return prev;
    }
    exec(prev : State, arg : DataToken):State{
        if(!this.allowed_args.includes(arg.type)) throw "illegal argument type";
        return this.perform(prev, arg);
    }
}

let ADD = new Executor();
ADD.perform = function (prev : State, arg : DataToken):State {
    if (arg.value === "") throw "ADD: MISSING ARGUMENT";
    switch (arg.type) {
        case DataTokenType.LABEL:
            throw "ADD: ILLEGAL ARGUMENT 'label'";
        case DataTokenType.NUMBER:
            prev.mem.set(
                0,
                prev.mem.get(0) + Number(arg.value)
            );
            break;
        case DataTokenType.ADDRESS_TO_NUMBER:
            prev.mem.set(
                0,
                prev.mem.get(0) + prev.mem.get(Number(arg.value))
            );
            break;
        case DataTokenType.ADDRESS_TO_ADDRESS:
            prev.mem.set(
                0,
                prev.mem.get(0) + prev.mem.get(prev.mem.get(Number(arg.value)))
            );
            break;
        default:
            throw "ADD: ILLEGAL ARGUMENT '" + arg.type + "'";
    }
    prev.commandCounter++;
    return prev;
};

export class Engine {
    executors : Map<string, Executor> ;
    constructor(){
        this.executors = new Map([
            [ "ADD", ADD ]
        ]);
    }
    step(prev: State, firmware: Firmware): State {
        let cmd: Command = firmware.commands[prev.commandCounter];
        let exe = this.executors.get(cmd.commandId);
        if(typeof exe !== "undefined") exe.exec(prev,cmd.arg);
        else throw "unsupported command id";
        return prev;
    }

    execute(prev: State, firmware: Firmware): State {
        return prev;
    }

    debug(prev: State, firmware: Firmware, term: Terminator): State {
        return prev;
    }
}