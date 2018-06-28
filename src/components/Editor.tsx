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
import { Action } from 'utils/Action';

const logo = require('assets/logo.svg');

export class Editor extends React.Component<object, object> {
    rm: RM;

    update_state(): void {
        this.setState({rmDisplayedState: clone(this.rm.state)});
    }

    update_code(nc: string): void {
        this.setState({rmDisplayedState: clone(this.rm.state)});
    }

    get_code(): string {
        return this.rm.firmware.text();
    }

    ctrl_handler(e: Action): void {
        console.log(this);
        switch (e.id) {
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
        this.update_code.bind(this);
        this.get_code.bind(this);
        this.ctrl_handler.bind(this);
    }

    render() {
        this.ctrl_handler(new Action('ojej'));
        return (
            <div className="App">
                <Control handler={(e: Action) => this.ctrl_handler(e)}/>
                <Code handler={(e) => undefined} text={this.get_code()}/>
            </div>
        );
    }
}
