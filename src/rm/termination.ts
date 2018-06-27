import { Firmware } from './firmware';
import { State } from './state';

export class TerminationRule {
    check(state: State, firmware: Firmware): boolean {
        return false;
    }
}

export class TerminateAtLine extends TerminationRule {
    nr: number;

    constructor(lineNumber: number) {
        super();
        this.nr = lineNumber;
    }

    check(state: State, firmware: Firmware): boolean {
        return state.commandCounter === this.nr;

    }
}

export class Terminator {
    rules: TerminationRule[];

    addRule(r: TerminationRule): void {
        this.rules.push(r);
    }

    check(state: State, firmware: Firmware): boolean {
        for (let r of this.rules) {
            if (r.check(state, firmware)) return true;
        }
        return false;
    }
}