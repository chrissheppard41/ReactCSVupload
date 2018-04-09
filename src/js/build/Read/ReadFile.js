import React, { Component }  from 'react';
import Ajax from '../Ajax';
import CsvToArray from './CsvToArray';
import Page from './Page/Page';

class ReadFile extends Component {
    constructor () {
        super();

        this.state = {
            data: [],
            file: "",
            location: "",
            stage1: "hide",
            stage2: "hide"
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
                data: objects,
                stage1: "show"
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

    submit () {
        var _self = this;
        var call = Ajax("http://localhost:9000/updateFile", "json", "Api-call");
        call.setType("POST");

        var packet = {
            data: this.state.data,
            path: this.state.location
        };
        call.setData(JSON.stringify(packet));
        call.exec().then(function (data) {
            _self.setState({
                data: data,
                stage2: "show"
            });
        });
    }

    render (){
        return (
            <div>
                <form action method="POST" onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
                    <div className="form-group row">
                        <label htmlFor="inputFile" className="col-sm-2 control-label">File</label>
                        <div className="col-sm-10">
                            <input type="file" ref="file" name="inputFile" id="inputFile" className="form-control" accept=".csv" onChange={this.updateFile.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputLocation" className="col-sm-2 control-label">Location</label>
                        <div className="col-sm-10">
                            <input type="text" name="inputLocation" id="inputLocation" className="form-control" value={this.state.location} onChange={this.updateLocation.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
                <Page data={this.state.data} location={this.state.location} submit={this.submit.bind(this)} stage_one={this.state.stage1} stage_two={this.state.stage2}/>
            </div>
        );
    }
}

export default ReadFile;
//ReactDOM.render(<ReadFile />, document.getElementById('container'));