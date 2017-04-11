import React, { Component }  from 'react';
import CsvToArray from './CsvToArray';
import Page from './Page/Page';

class ReadFile extends Component {
    constructor () {
        super();

        this.state = {
            data: [],
            file: "",
            location: ""
        };
    }

    handleSubmit (event) {
        event.preventDefault();

        //@todo to do validation
        //var file = this.refs.file.files[0];
        var file = this.state.file;
        var reader = new FileReader();
        reader.onload = function (evt){
            var resultText = evt.target.result;
            const objects = this.csvToJson(resultText);
            this.setState({
                data: objects
            });
        }.bind(this);
        var newFile = file.slice(0,10000000);
        reader.readAsText(newFile);
    }

    csvToJson (csvString) {
        const csvtojson = CsvToArray(csvString);
        return csvtojson;
    }

    updateFile (event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    updateLocation (event) {
        this.setState({
            location: event.target.value
        });
    }

    render (){
        return (
            <div>
                <form action method="POST" onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputFile" className="col-sm-2 control-label">File</label>
                        <div className="col-sm-10">
                            <input type="file" ref="file" name="inputFile" id="inputFile" className="form-control" accept=".csv" onChange={this.updateFile.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLocation" className="col-sm-2 control-label">Location</label>
                        <div className="col-sm-10">
                            <input type="text" name="inputLocation" id="inputLocation" className="form-control" value={this.state.location} onChange={this.updateLocation.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <Page data={this.state.data} location={this.state.location}/>
            </div>
        );
    }
}

export default ReadFile;
//ReactDOM.render(<ReadFile />, document.getElementById('container'));