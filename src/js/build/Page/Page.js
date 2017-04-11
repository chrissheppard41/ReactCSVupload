import React, { Component } from 'react';
import Ajax from './Ajax';
/**
 * Page
 *
 * Displays the contents of a CSV file, each row displays a page
 *
 * @author Chris Sheppard
 */
class Page extends Component {
    onSubmit (event) {
        event.preventDefault();
        var call = Ajax("http://localhost:9000/updateFile", "json", "Api-test");
        call.setType("POST");

        var packet = {
            data: this.props.data,
            path: this.props.location
        };
        call.setData(JSON.stringify(packet));
        call.exec().then(function (data) {
            console.log("Finished");
        });

    }
    render () {
        const listItems = this.props.data.map((item, index) =>
            <tr key={index}>
                <td>{ this.props.location }</td>
                <td>{ item.url }</td>
                <td>{ item.fieldToUpdate }</td>
                <td>{ item.oldValue }</td>
                <td>{ item.newValue }</td>
                <td> </td>
            </tr>
        );
        return (
            <form action method="POST" onSubmit={this.onSubmit.bind(this)}>
                <input type="submit" value="Submit" />
                <table>
                    <thead>
                        <tr>
                            <th>File location</th>
                            <th>Page location</th>
                            <th>Update variable</th>
                            <th>From this value</th>
                            <th>To this value</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>
            </form>
        );
    }
}

export default Page;