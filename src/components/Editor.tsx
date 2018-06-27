import * as React from 'react';
import './App.css';
import { Code } from 'components/Code';
import { Control } from 'components/Control';
import { Engine } from 'root/rm/engine';
import { RM } from 'root/rm/rm';
import { State } from 'root/rm/state';
import { Firmware } from 'root/rm/firmware';
import { clone } from 'clone';
import { Terminator } from 'root/rm/termination';

const logo = require('assets/logo.svg');

export class Editor extends React.Component<object, object> {
    rm: RM;

    constructor(props) {
        super(props);
        this.rm = new RM(undefined, undefined, undefined);
        this.state = {
            code: 'HALT',
            input: [],
            output: [],
            rmDisplayedState: State
        };
        this.update_state.bind(this);
        this.get_code.bind(this);
        this.ctrl_handler.bind(this);
    }

    // buildTerm():Terminator{
    //     let t = new Terminator()
    // }
    update_state(): void {
        this.setState({rmDisplayedState: clone(this.rm.state_)});
    }

    get_code(): string {
        return this.rm.firmware.text();
    }

    ctrl_handler(e: React.FormEvent<HTMLInputElement>): void {
        switch (e.currentTarget.name) {
            case 'play':
                this.rm.execute();
                break;
            case 'debug':
                console.error('not ready');
                break;
            case 'step':
                this.rm.step();
                break;
            default:
                console.error('sth went wrong, unknown event name at ctrl_handler');
                break;
        }
    }

    render() {
        return (
            <div className="App">
                <Control handler={this.ctrl_handler}/>
                <Code handler={(e) => undefined} text={this.get_code()}/>
            </div>
        );
    }
}
