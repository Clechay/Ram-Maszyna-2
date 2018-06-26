import * as React from 'react';

export interface Props {
    handler: (e: Event, d?: object) => void
}


export class Control extends React.Component<Props, object> {
    render() {
        const {handler} = this.props;

        return <div className="control">
                    <button>play</button>
                    <button>step</button>
                    <button>debug</button>
                </div>;
    }
}