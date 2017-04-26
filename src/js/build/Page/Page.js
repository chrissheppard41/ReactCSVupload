import React, { Component } from 'react';
import {CSVLink} from 'react-csv';
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
        this.props.submit();
    }
    render () {
        const listItems = this.props.data.map((item, index) =>
            <tr key={index} className={item.status}>
                <td>{ this.props.location }</td>
                <td>{ item.url }</td>
                <td>{ item.fieldToUpdate }</td>
                <td>{ item.oldValue }</td>
                <td>{ item.newValue }</td>
            </tr>
        );
        return (
            <div className={this.props.stage_one}>
                <form action method="POST" onSubmit={this.onSubmit.bind(this)}>
                    <input type="submit" value="Update files" className="btn btn-success" />
                    <table>
                        <thead>
                            <tr>
                                <th>File location</th>
                                <th>Page location</th>
                                <th>Update variable</th>
                                <th>From this value</th>
                                <th>To this value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems}
                        </tbody>
                    </table>
                </form>
                <CSVLink data={this.props.data} filename={"Extract.csv"} className={this.props.stage_two}>Download CSV</CSVLink>
            </div>
        );
    }
}

export default Page;