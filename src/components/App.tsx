import * as React from 'react';
import './App.css';
import { Editor } from './Editor';

const logo = require('assets/logo.svg');

class App extends React.Component<object, object> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Editor/>
        );
    }
}

export default App;
