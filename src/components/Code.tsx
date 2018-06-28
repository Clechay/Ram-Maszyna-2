import * as React from 'react';
import { Action } from 'utils/Action';

export interface Props {
    handler: (e: Action) => void;
    text: string;
}

export class Code extends React.Component<Props, object> {
    render() {
        const {handler, text} = this.props;

        return (
            <div className="code">
                <textarea
                    className="source_code"
                    onChange={(e) => {
                        handler(new Action('code_update', {newCode: e.target.value}));
                    }}
                >
                    {text}
                </textarea>
            </div>
        );
    }
}