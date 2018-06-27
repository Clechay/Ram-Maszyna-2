import * as React from 'react';

export interface Props {
    handler: (e: Event, d?: object) => void;
    text: string;
}

export class Input extends React.Component<Props, object> {
    render() {
        const {handler} = this.props;

        return (
            <div className="code">
                <textarea className="source_code">text</textarea>
            </div>
        );
    }
}