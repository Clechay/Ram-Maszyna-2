import { Engine } from './engine'
import { Firmware } from './firmware'
import { State } from './state'
import { Terminator } from 'root/rm/termination';

export class RM{
    engine : Engine;
    firmware : Firmware;
    state_ : State;
    constructor(eng: Engine|undefined, fir: Firmware|undefined, sta: State|undefined){
        if(typeof eng === typeof undefined) eng = new Engine();
        if(typeof fir === typeof undefined) fir = new Firmware();
        if(typeof sta === typeof undefined) sta = new State([]);
        this.engine = eng;
        this.firmware = fir;
        this.state_= sta;
    }
    execute():State{
        this.state_ = this.engine.execute(this.state_,this.firmware);
        return this.state_;
    }
    debug(term : Terminator):State{
        this.state_ = this.engine.debug(this.state_,this.firmware, term);
        return this.state_;
    }
    step():State{
        this.state_ = this.engine.step(this.state_,this.firmware);
        return this.state_;
    }
}