import * as React from 'react';
import { Action } from 'utils/Action';

export interface Props {
    handler: (e: Action) => void;
}

export class Control extends React.Component<Props, object> {
    render() {
        const {handler} = this.props;

        return (
            <div className="control">
                <button onClick={() => handler(new Action('build'))}>build</button>
                <button onClick={() => handler(new Action('play'))}>play</button>
                <button onClick={() => handler(new Action('step'))}>step</button>
                <button onClick={() => handler(new Action('debug'))}>debug</button>
            </div>
        );
    }
}