import React, { Component } from 'react';
import ReadFile from './ReadFile';


class Csv extends Component {
    render() {
        return (
            <div>
                <p className="App-intro">
                    Updates the specific front matter variables based on the input from a CSV formatted file.
                </p>
                <ReadFile />
            </div>
        );
    }
}

export default Csv;