import * as React from 'react';

export interface Props {
    handler: (e: Event, d: object) => void
}


export class Control extends React.Component<Props, object> {
    render() {
        const {handler} = this.props;

        return (
            <div className="control">
                <div className="greeting">

                </div>
            </div>
        );
    }
}