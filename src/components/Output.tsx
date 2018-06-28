import * as React from 'react';
import { Action } from 'utils/Action';

export interface Props {
    elems: number[];
}

export interface PropsElem {
    el: number | string;
}

class Elem extends React.Component<PropsElem, object> {
    render() {
        const {el} = this.props;
        return <li>{el}</li>;
    }
}

export class Output extends React.Component<Props, object> {
    render() {
        const {elems} = this.props;

        return (
            <div className="ribbon ribbonOut">
                <ul>
                    <li className="header">out:</li>
                    {elems.map((e, index) => <Elem el={e} key={index}/>)}
                </ul>
            </div>
        );
    }
}