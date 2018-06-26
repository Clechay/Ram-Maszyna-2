import * as React from 'react';
import './App.css';
import {Code} from 'components/Code';
import {Control} from 'components/Control';
import {Engine} from 'root/rm/engine';
import {RM} from 'root/rm/rm';
import {State} from 'root/rm/state';
import {Firmware} from 'root/rm/firmware';
import {clone} from 'clone';
import { Terminator } from 'root/rm/termination';

const logo = require('assets/logo.svg');

class App extends React.Component<object, object> {
    rm: RM;
    constructor(props){
        super(props);
        this.rm = new RM(undefined,this.rmFirmware,this.rmState);
        this.state = {
            code: "HALT",
            input: [],
            output: [],
            rmDisplayedState: State
        };
        this.update_state.bind(this);
        this.get_code.bind(this);
        this.ctrl_hnadler.bind(this);
        this.buildTerm.bind(this);
    }
    buildTerm():Terminator{
        let t = new Terminator()
    }
    update_state(): void{
        this.setState({rmDisplayedState:clone(this.rmState)});
    }
    get_code(): string{
        return this.rmFirmware.commands.map((e)=>e.raw).reduce((a,e)=>a+"\n"+e);
    }
    ctrl_hnadler(e:React.FormEvent<HTMLInputElement>):void{
        switch (e.currentTarget.name){
            case "play":
                this.rm.execute();
                break;
            case "debug":
                this.rm.debug(this.buildTerm());
                break;
            case "step":
                this.rm.step();
                break;
            default:
                console.error("sth went wrong, unknown event name at ctrl_handler");
                break;
        }
    }
    render() {
        return (
            <div className="App">
                <Control handler={this.ctrl_hnadler}/>
                <Code handler={(e)=>undefined} text={this.get_code()}/>
            </div>
        );
    }
}

export default App;
