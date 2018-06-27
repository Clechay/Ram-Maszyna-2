import { Engine } from './engine';
import { Firmware } from './firmware';
import { State } from './state';
import { Terminator } from 'root/rm/termination';

export class RM {
    engine: Engine;
    firmware: Firmware;
    state: State;

    constructor(eng: Engine | undefined, fir: Firmware | undefined, sta: State | undefined) {
        if (typeof eng === typeof undefined) eng = new Engine();
        if (typeof fir === typeof undefined) fir = new Firmware();
        if (typeof sta === typeof undefined) sta = new State([]);
        this.engine = eng;
        this.firmware = fir;
        this.state = sta;
    }

    execute(): State {
        this.state = this.engine.execute(this.state, this.firmware);
        return this.state;
    }

    debug(term: Terminator): State {
        this.state = this.engine.debug(this.state, this.firmware, term);
        return this.state;
    }

    step(): State {
        this.state = this.engine.step(this.state, this.firmware);
        return this.state;
    }
}